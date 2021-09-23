import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, get, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import {
  bitcoinToSatoshi,
  satoshiToBitcoin,
  walletBech32ToHex,
  walletHexToBase58,
  walletHexToBech32,
} from '../../services/bitcoin';
import { RedeemWithdrawModal } from './components/RedeemWithdrawModal/RedeemWithdrawModal';
import { RedeemDetailsModal } from './components/RedeemDetailsModal/RedeemDetailsModal';
import { RedeemConfirmModal } from './components/RedeemConfirmModal';
import { RedeemDetails } from 'onebtc.sdk/lib/blockchain/hmy/types';

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
    vaultId: '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581',
  };

  @observable redeemMap: {
    [key: string]: {
      redeemAmount: number;
      vaultId: string;
      redeemEvent: RedeemDetails;
      btcBase58Address: string;
      btcAddress: string;
    };
  } = {};

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;

  constructor(stores) {
    super(stores);
  }

  @computed
  get bridgeFee() {
    return (Number(this.form.oneBTCAmount) * 2) / 1000;
  }

  @computed
  get totalReceived() {
    return Number(this.form.oneBTCAmount) - this.bridgeFee;
  }

  @action.bound
  public async executeRedeem(transactionHash: string, btcTxHash: string) {
    this.status = 'pending';

    const redeemUiTx = this.stores.uiTransactionsStore.create();
    redeemUiTx.setStatusProgress();
    redeemUiTx.showModal();
    try {
      const redeem = this.redeemMap[transactionHash];

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
          total: satoshiToBitcoin(redeem.redeemEvent.amount),
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

  public openRedeemWithdrawModal(transactionHash: string) {
    this.stores.actionModals.open(RedeemWithdrawModal, {
      applyText: 'View Progress',
      closeText: 'Close',
      initData: {
        transactionHash: transactionHash,
      },
      noValidation: true,
      width: '500px',
      showOther: true,
      onApply: () => {
        this.openRedeemDetailsModal(transactionHash);
        this.stores.routing.gotToRedeemModal(transactionHash, 'details');
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }

  @get
  public getRedeemInfo(requestRedeemTxHash: string) {
    const redeem = this.redeemMap[requestRedeemTxHash];

    const sendAmount = satoshiToBitcoin(redeem.redeemAmount);
    const totalReceived = satoshiToBitcoin(redeem.redeemEvent.amount);

    return {
      sendAmount,
      sendUsdAmount: sendAmount * this.stores.user.btcRate,
      redeemId: redeem.redeemEvent.redeem_id,
      vaultId: redeem.redeemEvent.vault_id,
      bitcoinAddress: redeem.btcAddress,
      bridgeFee: satoshiToBitcoin(redeem.redeemEvent.fee),
      totalReceived: satoshiToBitcoin(redeem.redeemEvent.amount),
      totalReceivedUsd: totalReceived * this.stores.user.btcRate,
      rawRedeem: redeem.redeemEvent,
    };
  }

  @action.bound
  public openRedeemDetailsModal(transactionHash: string) {
    this.stores.actionModals.open(RedeemDetailsModal, {
      applyText: '',
      closeText: 'Close',
      initData: {
        transactionHash,
      },
      noValidation: true,
      width: '80%',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });

    return true;
  }

  public async loadRedeemDetails(redeemId: string) {
    const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

    const redeemEvent = await hmyClient.methods.getRedeemDetails(redeemId);

    if (!redeemEvent) {
      throw new Error('Not found redeem details');
    }

    this.redeemMap[redeemId] = {
      redeemAmount: Number(redeemEvent.amount),
      vaultId: redeemEvent.vault_id,
      redeemEvent: redeemEvent,
      btcAddress: walletHexToBech32(redeemEvent.btc_address),
      btcBase58Address: walletHexToBase58(redeemEvent.btc_address),
    };
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

      this.redeemMap[redeemRequest.transactionHash] = {
        redeemAmount,
        vaultId,
        redeemEvent,
        btcAddress,
        btcBase58Address: walletHexToBase58(redeemEvent.btc_address),
      };

      this.stores.routing.gotToRedeemModal(
        redeemRequest.transactionHash,
        'withdraw',
      );

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
