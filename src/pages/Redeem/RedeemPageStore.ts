import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import {
  bitcoinToSatoshi,
  satoshiToBitcoin,
  btcAddressBech32ToHex,
} from '../../services/bitcoin';
import { RedeemWithdrawModal } from './components/RedeemWithdrawModal/RedeemWithdrawModal';
import { RedeemDetailsModal } from './components/RedeemDetailsModal/RedeemDetailsModal';
import { RedeemConfirmModal } from './components/RedeemConfirmModal';
import { IRedeem, IVault } from '../../modules/dashboard/dashboardTypes';
import { retry } from '../../utils';
import { UITransactionStatus } from '../../modules/uiTransaction/UITransactionsStore';
import { RedeemCanceledModal } from './components/RedeemCanceledModal';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import BN from 'bn.js';
import logger from '../../modules/logger';

const log = logger.module('Redeem');

export interface IDefaultForm {
  oneBTCAmount: string;
  totalReceive: number;
  bitcoinAddress: string;
  vaultId: string;
}

const BRIDGE_RATIO = 5;

export class RedeemPageStore extends StoreConstructor {
  defaultForm: IDefaultForm = {
    oneBTCAmount: '0.0001',
    bitcoinAddress: '',
    totalReceive: 0,
    vaultId: '',
  };

  @observable redeemMap: Record<string, IRedeem> = {};

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;
  @observable private _vaultList: IVault[] = [];

  @computed
  get bridgeFee() {
    return (Number(this.form.oneBTCAmount) * BRIDGE_RATIO) / 1000;
  }

  get bridgeRatio() {
    return (BRIDGE_RATIO / 1000) * 100;
  }

  @computed
  get totalReceived() {
    return Number(this.form.oneBTCAmount) - this.bridgeFee;
  }

  @action.bound
  updateSelectedVault(ignorePriority: boolean = false) {
    const vaultList = this.getActiveVaultList(
      this.stores.vaultListStore.vaultList,
      ignorePriority,
    );

    this.form.vaultId = this.stores.vaultListStore.getDefaultVaultId(vaultList);
  }

  getActiveVaultList(vaultList: IVault[], ignorePriority: boolean = false) {
    const amountSat = bitcoinToSatoshi(this.form.oneBTCAmount);

    const list = vaultList.filter(vault => {
      return this.stores.vaultListStore.isEnoughFunds(
        vault,
        amountSat,
        'redeem',
      );
    });

    const hasLowCollateral = (p: number) => vault =>
      this.stores.vaultStore.getVaultInfo(vault).collateralTotal < p;

    let priorityList = list.filter(hasLowCollateral(135));

    if (priorityList.length === 0) {
      priorityList = list.filter(hasLowCollateral(150));
    }

    if (ignorePriority) {
      return list;
    }

    return (priorityList.length && priorityList) || list;
  }

  @action.bound
  public async loadData() {
    await this.stores.vaultListStore.loadVaults();

    const vaultList = this.stores.vaultListStore.vaultRedeemList;

    const defaultVaultId = this.stores.vaultListStore.getDefaultVaultId(
      vaultList,
    );

    if (this.form.vaultId) {
      return;
    }
    this.form.vaultId = defaultVaultId;
  }

  @action.bound
  public async executeRedeem(redeemId: string, btcTxHash: string) {
    this.status = 'pending';

    const redeemUiTx = this.stores.uiTransactionsStore.create(undefined, {
      titles: {
        [UITransactionStatus.WAITING_SIGN_IN]:
          'Waiting for user to sign execute redeem request',
        [UITransactionStatus.PROGRESS]:
          'Waiting for execute redeem transaction to confirm',
      },
    });
    redeemUiTx.setStatusProgress();
    redeemUiTx.showModal();
    try {
      const redeem = this.stores.redeemStore.getRedeemInfo(redeemId);

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      redeemUiTx.setStatusWaitingSignIn();

      const result = await hmyClient.executeRedeem(
        redeem.requester,
        redeem.redeemId,
        btcTxHash,
        txHash => {
          redeemUiTx.setTxHash(txHash);
          redeemUiTx.setStatusProgress();
        },
      );
      redeemUiTx.hideModal();
      redeemUiTx.setStatusSuccess();

      this.stores.actionModals.open(RedeemConfirmModal, {
        initData: {
          total: redeem.totalReceived,
          txHash: result.transactionHash,
        },
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';
      log.info('ExecuteRedeem finished');
    } catch (err) {
      log.error('ExecuteRedeem', { error: err, redeemId });
      this.status = 'error';
      redeemUiTx.setError(err);
      redeemUiTx.setStatusFail();
    }
  }

  public async openRedeemWithdrawModal(redeemId: string) {
    await this.stores.redeemStore.loadRedeem(redeemId);
    this.stores.actionModals.open(RedeemWithdrawModal, {
      applyText: 'View Progress',
      closeText: 'Close',
      initData: {
        redeemId,
      },
      noValidation: true,
      width: '500px',
      showOther: true,
      onApply: () => {
        this.openRedeemDetailsModal(redeemId);
        this.stores.routing.gotToRedeemModal(redeemId, 'details');
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async openRedeemDetailsModal(redeemId: string, onClose?: () => void) {
    await this.stores.redeemStore.loadRedeem(redeemId);

    this.stores.actionModals.open(RedeemDetailsModal, {
      applyText: '',
      closeText: 'Close',
      initData: {
        redeemId,
      },
      noValidation: true,
      width: '80%',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        if (onClose) {
          onClose();
        }
        return Promise.resolve();
      },
    });

    return true;
  }

  @action.bound
  public async createRedeem() {
    if (!this.stores.user.isAuthorized) {
      this.stores.user.openConnectWalletModal();
      return;
    }
    this.status = 'pending';

    const redeemUiTx = this.stores.uiTransactionsStore.create(undefined, {
      titles: {
        [UITransactionStatus.WAITING_SIGN_IN]:
          'Waiting for user to sign request redeem request',
        [UITransactionStatus.PROGRESS]:
          'Waiting for confirmation of redeem request',
      },
    });

    redeemUiTx.setStatusWaitingSignIn();
    redeemUiTx.showModal();
    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const redeemAmount = bitcoinToSatoshi(this.form.oneBTCAmount);
      const btcAddress = this.form.bitcoinAddress;
      const vaultId = this.form.vaultId;

      const _btcAddress = btcAddressBech32ToHex(btcAddress);

      let transactionHash = null;
      const redeemRequest = await hmyClient.requestRedeem(
        redeemAmount,
        _btcAddress,
        vaultId,
        txHash => {
          transactionHash = txHash;
          redeemUiTx.setTxHash(txHash);
          redeemUiTx.setStatusProgress();
        },
      );

      if (transactionHash) {
        await dashboardClient.addEvent(transactionHash);
      }

      const redeem = await retry(
        () => this.stores.redeemStore.loadRedeem(redeemRequest.redeem_id),
        result => !!result,
        10,
      );

      this.stores.routing.gotToRedeemModal(redeem.id, 'withdraw');

      redeemUiTx.setStatusSuccess();
      redeemUiTx.hideModal();
      this.status = 'success';
    } catch (err) {
      redeemUiTx.setError(err);
      redeemUiTx.setStatusFail();
      log.error('RequestRedeem', { error: err, ...this.form });
      this.status = 'error';
    }
  }

  @action
  async cancelRedeem(redeemId: string) {
    const uiTx = this.stores.uiTransactionsStore.create();
    uiTx.setStatusWaitingSignIn();
    uiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const redeemInfo = this.stores.redeemStore.getRedeemInfo(redeemId);

      // const reimburse = addressIsEq(
      //   redeemInfo.requester,
      //   this.stores.user.address,
      // );

      await hmyClient.cancelRedeem(
        redeemInfo.requester,
        redeemId,
        false,
        txHash => {
          uiTx.setTxHash(txHash);
          uiTx.setStatusProgress();
        },
      );

      uiTx.hideModal();
      this.stores.actionModals.open(RedeemCanceledModal, {
        initData: {},
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
    } catch (err) {
      log.error('CancelRedeem', { error: err, redeemId });
      this.status = 'error';
      uiTx.setError(err);
      uiTx.setStatusFail();
    }
  }

  public async loadAvailableToWithdrawWei(vault: IVault) {
    const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

    const collateralBalance = await hmyClient.contract.methods
      .CollateralBalances(vault.id)
      .call();

    const collateralForIssued = await hmyClient.contract.methods
      .collateralForIssued(new BN(vault.issued).add(new BN(vault.toBeIssued)))
      .call();

    const c = new BN(collateralBalance).sub(new BN(collateralForIssued));

    return BN.max(c, new BN(0)).toString();
  }
}
