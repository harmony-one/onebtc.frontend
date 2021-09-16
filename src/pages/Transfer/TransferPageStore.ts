import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, observable } from 'mobx';
import { getHmyClient } from 'services/oneBtcClient';
import { TransferConfirmModal } from './components/TransferConfirmModal';
import { satoshiToBitcoin } from '../../services/bitcoin';

interface IIssueEvent {
  issue_id: string;
  requester: string;
  vault_id: string;
  amount: string;
  fee: string;
  btc_address: string;
}

export interface IDefaultForm {
  oneBTCAmount: string;
  oneAddress: string;
}

export class TransferPageStore extends StoreConstructor {
  defaultForm: IDefaultForm = {
    oneBTCAmount: '0.00001',
    oneAddress: '0xB4C3e3cB2823Cf116A678c6A5Da90F88FB6eFddd',
  };

  @observable issuesMap: {
    [key: string]: {
      issueAmount: number;
      vaultId: string;
      issueEvent: IIssueEvent;
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

  @action.bound
  public async mockExecuteIssue(transactionHash: string) {}

  @action.bound
  public async creteTransfer() {
    this.status = 'pending';

    const transferUiTx = this.stores.uiTransactionsStore.create();
    transferUiTx.setStatusWaitingSignIn();
    transferUiTx.showModal();

    try {
      const hmyClient = await getHmyClient();

      // const vaultId = this.form.vaultId;
      hmyClient.setUseOneWallet(true);
      const issueAmount = Number(this.form.oneBTCAmount) * 1e9;
      console.log('### issueAmount', issueAmount);

      const result = await hmyClient.methods.transfer(
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
