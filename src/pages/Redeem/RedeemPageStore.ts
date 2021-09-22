import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import {
  bitcoinToSatoshi,
  mockBitcoinTx,
  satoshiToBitcoin,
  walletBech32ToHex,
  walletHexToBase58,
} from '../../services/bitcoin';
import { RedeemWithdrawModal } from './components/RedeemWithdrawModal';
import { RedeemTransactionModal } from './components/RedeemTransactionModal';
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
    bitcoinAddress: 'tb1quqayjeavh584t7nzrtnryv6gtrrwk92ef47nfa',
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
  public async mockExecuteRedeem(transactionHash: string) {
    console.log('### mockExecuteRedeem');
    this.status = 'pending';

    const redeemUiTx = this.stores.uiTransactionsStore.create();
    redeemUiTx.setStatusProgress();
    redeemUiTx.showModal();
    try {
      const redeem = this.redeemMap[transactionHash];

      const address = this.stores.user.address;

      const mockedBtcTX = mockBitcoinTx(
        redeem.redeemEvent.redeem_id,
        redeem.btcBase58Address,
        redeem.redeemAmount,
      );

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      console.log('### run execute issuePageStore');

      redeemUiTx.setStatusWaitingSignIn();

      const result = await hmyClient.methods.executeRedeem(
        address,
        // @ts-ignore
        redeem.redeemEvent.redeem_id,
        mockedBtcTX.proofMock,
        mockedBtcTX.btcTx.toBuffer(),
        mockedBtcTX.heightAndIndex,
        mockedBtcTX.headerMock,
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

  @action.bound
  public openTransactionModal(transactionHash: string) {
    this.stores.actionModals.open(RedeemTransactionModal, {
      applyText: 'Continue',
      closeText: 'Execute issue with mock Tx',
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
        this.mockExecuteRedeem(transactionHash);
        return Promise.resolve();
      },
    });

    return true;
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

      this.stores.actionModals.open(RedeemWithdrawModal, {
        applyText: 'View progress',
        closeText: 'Close',
        initData: {
          transactionHash: redeemRequest.transactionHash,
        },
        noValidation: true,
        width: '500px',
        showOther: true,
        onApply: () => {
          this.openTransactionModal(redeemRequest.transactionHash);
          return Promise.resolve();
        },
        onClose: () => {
          return Promise.resolve();
        },
      });

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
