import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, get, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import {
  bitcoinToSatoshi,
  satoshiToBitcoin,
  walletBech32ToHex,
  walletHexToBech32,
} from '../../services/bitcoin';
import { RedeemWithdrawModal } from './components/RedeemWithdrawModal/RedeemWithdrawModal';
import { RedeemDetailsModal } from './components/RedeemDetailsModal/RedeemDetailsModal';
import { RedeemConfirmModal } from './components/RedeemConfirmModal';
import { btcRelayClient } from '../../modules/btcRelay/btcRelayClient';
import { IRedeem, IVault } from '../../modules/btcRelay/btcRelayTypes';

export interface IDefaultForm {
  oneBTCAmount: string;
  totalReceive: number;
  bitcoinAddress: string;
  vaultId: string;
}

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
  @observable vaultList: IVault[] = [];

  @computed
  get bridgeFee() {
    return (Number(this.form.oneBTCAmount) * 2) / 1000;
  }

  @computed
  get totalReceived() {
    return Number(this.form.oneBTCAmount) - this.bridgeFee;
  }

  @action.bound
  public async loadVaults() {
    const response = await btcRelayClient.loadVaultList({ size: 10, page: 0 });
    this.vaultList = response.content;
  }

  @action.bound
  public async executeRedeem(redeemId: string, btcTxHash: string) {
    this.status = 'pending';

    const redeemUiTx = this.stores.uiTransactionsStore.create();
    redeemUiTx.setStatusProgress();
    redeemUiTx.showModal();
    try {
      const redeem = this.getRedeemInfo(redeemId);

      const address = this.stores.user.address;

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);
      hmyClient.setUseMathWallet(true);

      console.log('### run execute issuePageStore');

      redeemUiTx.setStatusWaitingSignIn();

      const result = await hmyClient.methods.executeRedeem(
        address,
        // @ts-ignore
        redeem.redeemEvent.redeem_id,
        btcTxHash,
        txHash => {
          redeemUiTx.setTxHash(txHash);
          redeemUiTx.setStatusProgress();
        },
      );
      console.log('### execute redeem success');
      redeemUiTx.hideModal();
      redeemUiTx.setStatusSuccess();

      this.stores.actionModals.open(RedeemConfirmModal, {
        initData: {
          total: satoshiToBitcoin(redeem.totalReceived),
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
      console.log('### execute issuePageStore finished');
    } catch (err) {
      console.log('### err mock execute issuePageStore error', err);
      this.status = 'error';
      redeemUiTx.setError(err);
      redeemUiTx.setStatusFail();
    }
  }

  public async openRedeemWithdrawModal(redeemId: string) {
    await this.loadRedeemDetails(redeemId);
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

  @get
  public getRedeemInfo(redeemId: string) {
    const redeem = this.redeemMap[redeemId];

    const sendAmount = satoshiToBitcoin(redeem.amountBtc);
    const totalReceived = satoshiToBitcoin(redeem.amountBtc);

    return {
      sendAmount,
      sendUsdAmount: sendAmount * this.stores.user.btcRate,
      redeemId: redeem.id,
      vaultId: redeem.vault,
      bitcoinAddress: walletHexToBech32(redeem.btcAddress),
      bridgeFee: satoshiToBitcoin(redeem.fee),
      totalReceived: totalReceived,
      totalReceivedUsd: totalReceived * this.stores.user.btcRate,
      rawRedeem: redeem,
    };
  }

  @action.bound
  public async openRedeemDetailsModal(redeemId: string, onClose?: () => void) {
    await this.loadRedeemDetails(redeemId);

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

  public async loadRedeemDetails(redeemId: string) {
    const redeem = await btcRelayClient.loadRedeem(redeemId);

    if (!redeem) {
      throw new Error('Not found redeem details');
    }

    this.redeemMap[redeemId] = redeem;
  }

  @action.bound
  public async createRedeem() {
    this.status = 'pending';

    const redeemUiTx = this.stores.uiTransactionsStore.create();

    redeemUiTx.setStatusWaitingSignIn();
    redeemUiTx.showModal();
    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      hmyClient.setUseOneWallet(true);
      const redeemAmount = bitcoinToSatoshi(this.form.oneBTCAmount);
      console.log('### redeemAmount', redeemAmount);
      const btcAddress = this.form.bitcoinAddress;
      const vaultId = this.form.vaultId;

      const _btcAddress = walletBech32ToHex(btcAddress);

      const redeemRequest = await hmyClient.methods.requestRedeem(
        redeemAmount,
        _btcAddress,
        vaultId,
        txHash => {
          redeemUiTx.setTxHash(txHash);
          redeemUiTx.setStatusProgress();
        },
      );

      console.log('### redeemRequest', redeemRequest);
      const redeemEvent = await hmyClient.methods.getRedeemDetails(
        redeemRequest.transactionHash,
      );

      if (!redeemEvent) {
        throw new Error('Not found redeem details');
      }

      const redeem = await btcRelayClient.loadRedeem(redeemEvent.redeem_id);

      this.redeemMap[redeemRequest.transactionHash] = redeem;

      this.stores.routing.gotToRedeemModal(redeem.id, 'withdraw');

      redeemUiTx.setStatusSuccess();
      redeemUiTx.hideModal();
      this.status = 'success';
    } catch (err) {
      redeemUiTx.setError(err);
      redeemUiTx.setStatusFail();
      console.log('### Error during create issuePageStore', err);
      this.status = 'error';
    }
  }
}
