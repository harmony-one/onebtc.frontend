import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import { TransferConfirmModal } from './components/TransferConfirmModal';
import { bitcoinToSatoshi, satoshiToBitcoin } from '../../services/bitcoin';
import { UITransactionStatus } from '../../modules/uiTransaction/UITransactionsStore';

export interface IDefaultForm {
  oneBTCAmount: string;
  oneAddress: string;
}

export class TransferPageStore extends StoreConstructor {
  defaultForm: IDefaultForm = {
    oneBTCAmount: '0.0001',
    oneAddress: '',
  };

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;

  @action.bound
  public async creteTransfer() {
    if (!this.stores.user.isAuthorized) {
      this.stores.user.openConnectWalletModal();
      return;
    }
    this.status = 'pending';

    const transferUiTx = this.stores.uiTransactionsStore.create(undefined, {
      titles: {
        [UITransactionStatus.WAITING_SIGN_IN]:
          'Waiting for user to sign transfer request',
        [UITransactionStatus.PROGRESS]:
          'Waiting for transfer transaction to confirm',
      },
    });
    transferUiTx.setStatusWaitingSignIn();
    transferUiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const issueAmount = bitcoinToSatoshi(this.form.oneBTCAmount);
      console.log('### issueAmount', issueAmount);

      const result = await hmyClient.transfer(
        this.form.oneAddress,
        issueAmount,
        txHash => {
          transferUiTx.setTxHash(txHash);
          transferUiTx.setStatusProgress();
        },
      );

      console.log('### result', result);

      transferUiTx.setStatusSuccess();
      transferUiTx.hideModal();

      this.stores.actionModals.open(TransferConfirmModal, {
        applyText: '',
        closeText: '',
        width: '320px',
        noValidation: true,
        initData: {
          txHash: result.transactionHash,
          total: satoshiToBitcoin(issueAmount),
        },
        onApply: () => {
          return Promise.resolve();
        },
      });

      this.status = 'success';
    } catch (err) {
      this.status = 'error';
      transferUiTx.setStatusFail();
      transferUiTx.setError(err);
      console.log('### Error during create issuePageStore', err);
      this.status = 'error';
    }
  }
}
