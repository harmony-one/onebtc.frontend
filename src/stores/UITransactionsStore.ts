import { StoreConstructor } from './core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { IStores } from './index';
import { UITransactionModal } from '../pages/Issue/components/UITransactionModal';
import { guid } from '../utils';

export enum UITransactionStatus {
  INIT = 'init',
  WAITING_SIGN_IN = 'sign_in',
  PROGRESS = 'progress',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export class UITransaction extends StoreConstructor {
  public id: string;

  @observable
  txHash: string | '' = '';

  @observable
  status: UITransactionStatus;

  @observable
  issue?: {
    issueId: string;
  };
  redeem?: {
    redeemId: string;
  };
  transfer?: {
    transferId: string;
  };
  burn?: {
    burnId: string;
  };

  @observable
  error: Error;

  constructor(id: string, stores: IStores) {
    super(stores);
    this.id = id;
  }

  @action.bound
  setStatusWaitingSignIn() {
    this.status = UITransactionStatus.WAITING_SIGN_IN;
  }

  @action.bound
  setStatusProgress() {
    this.status = UITransactionStatus.PROGRESS;
  }

  @action.bound
  setStatusSuccess() {
    this.status = UITransactionStatus.SUCCESS;
  }
  @action.bound
  setStatusFail() {
    this.status = UITransactionStatus.FAIL;
  }

  @action.bound
  setIssueId(issueId: string) {
    this.issue = {
      issueId,
    };
  }

  @action.bound
  setTxHash(txHash) {
    this.txHash = txHash;
  }

  @action.bound
  showModal() {
    this.stores.actionModals.open(UITransactionModal, {
      id: this.id,
      applyText: '',
      initData: {
        uiTxId: this.id,
      },
      closeText: '',
      noValidation: true,
      width: '320px',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }

  @action.bound
  hideModal() {
    this.stores.actionModals.close(this.id);
  }

  @action.bound
  setError(error: Error) {
    this.error = error;
  }

  @computed
  get errorMessage() {
    if (!this.error) {
      return '';
    }

    // https://docs.metamask.io/guide/ethereum-provider.html#events
    // @ts-ignore
    if (this.error.code && this.error.code === 4001) {
      return 'Request was rejected by the user';
    }

    // @ts-ignore
    if (this.error.code && this.error.code === -32602) {
      return 'The parameters were invalid';
    }

    // @ts-ignore
    if (this.error.code && this.error.code === -32603) {
      return 'Internal error';
    }

    // @ts-ignore
    if (this.error.receipt) {
      return this.error.message.split(':')[0];
    }

    return 'Error';
  }

  @computed
  get harmonyErrTxId() {
    // @ts-ignore
    if (!this.error || !this.error.receipt) {
      return '';
    }

    // @ts-ignore
    return this.error.receipt.transactionHash;
  }
}

export class UITransactionsStore extends StoreConstructor {
  @observable
  map: Record<string, UITransaction>;

  constructor(stores: IStores) {
    super(stores);
    this.map = {};
  }

  @action.bound
  create(txId?: string) {
    const _txId = txId || guid();
    const tx = new UITransaction(_txId, this.stores);
    this.map[_txId] = tx;
    return tx;
  }
}
