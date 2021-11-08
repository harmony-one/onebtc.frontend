import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { IStores } from '../../stores';
import { UITransactionModal } from './UITransactionModal';
import { guid } from '../../utils';

export enum UITransactionStatus {
  INIT = 'init',
  WAITING_SIGN_IN = 'sign_in',
  PROGRESS = 'progress',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export interface UITransactionConfig {
  titles?: Partial<Record<UITransactionStatus, string>>;
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

  titles: Record<UITransactionStatus, string> = {
    [UITransactionStatus.WAITING_SIGN_IN]: 'Waiting for sign',
    [UITransactionStatus.SUCCESS]: 'Transaction success',
    [UITransactionStatus.PROGRESS]: 'Waiting for transaction',
    [UITransactionStatus.FAIL]: 'Transaction fail',
    [UITransactionStatus.INIT]: 'Init',
  };

  @observable
  error: Error;
  @observable
  private _title: string = '';

  constructor(id: string, config: UITransactionConfig, stores: IStores) {
    super(stores);
    this.id = id;

    if (config.titles) {
      this.titles = { ...this.titles, ...config.titles };
    }
  }

  @action.bound
  setStatusWaitingSignIn() {
    this.status = UITransactionStatus.WAITING_SIGN_IN;
  }

  @action.bound
  setTitle(title: string) {
    this._title = title;
  }

  @computed
  get title() {
    return this.titles[this.status];
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
  create(txId?: string, config: UITransactionConfig = {}) {
    const _txId = txId || guid();
    const tx = new UITransaction(_txId, config, this.stores);
    this.map[_txId] = tx;
    return tx;
  }
}
