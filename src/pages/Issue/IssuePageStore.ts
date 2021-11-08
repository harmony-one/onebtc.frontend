import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, get, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import { IssueDepositModal } from './components/IssueDepositModal/IssueDepositModal';
import { IssueDetailsModal } from './components/IssueDetailsModal/IssueDetailsModal';
import { IssueConfirmModal } from './components/IssueConfirmModal';
import { guid, retry } from '../../utils';
import { UITransaction } from '../../modules/uiTransaction/UITransactionsStore';
import { bitcoinToSatoshi } from '../../services/bitcoin';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import { IIssue, IVault } from '../../modules/dashboard/dashboardTypes';
import { IssueCanceledModal } from './components/IssueCanceledModal';

export interface ITransaction {
  amount: string;
  vaultId: string;
}

export class IssuePageStore extends StoreConstructor {
  defaultForm: ITransaction = {
    amount: '0.0001',
    vaultId: '',
  };

  @observable issuesMap: Record<string, IIssue> = {};

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;
  @observable private _vaultList: IVault[] = [];

  @computed
  get bridgeFee() {
    return (Number(this.form.amount) * 2) / 1000;
  }

  @computed
  get totalReceive() {
    return Number(this.form.amount) - this.bridgeFee;
  }

  @action.bound
  createUiTx(progressModalId: string): UITransaction {
    return this.stores.uiTransactionsStore.create(progressModalId);
  }

  public getVault(vaultId: string) {
    return this._vaultList.find(vault => vault.id === vaultId);
  }

  @action
  async cancelIssue(issueId: string) {
    const uiTxId = guid();

    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.setStatusWaitingSignIn();
    issueUiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const issueInfo = this.stores.issueStore.getIssueInfo(issueId);

      await hmyClient.cancelIssue(issueInfo.requester, issueId, txHash => {
        issueUiTx.setTxHash(txHash);
        issueUiTx.setStatusProgress();
      });

      this.stores.actionModals.open(IssueCanceledModal, {
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
      console.log('### err execute cancelIssue error', err);
      this.status = 'error';
      issueUiTx.setStatusFail();
    }
  }

  @action.bound
  async executeIssue(issueId: string, btcTransactionHash: string) {
    this.status = 'pending';

    const uiTxId = guid();

    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.setStatusWaitingSignIn();
    issueUiTx.showModal();
    try {
      const issueInfo = this.stores.issueStore.getIssueInfo(issueId);

      const address = this.stores.user.address;

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      issueUiTx.setTitle('Waiting for user to sign execute issue request');
      const result = await hmyClient.executeIssue(
        address,
        issueInfo.issueId,
        btcTransactionHash,
        txHash => {
          issueUiTx.setTxHash(txHash);
          issueUiTx.setTitle(
            'Waiting for execute issue transaction to confirm',
          );
          issueUiTx.setStatusProgress();
        },
      );

      issueUiTx.setStatusSuccess();
      issueUiTx.hideModal();
      issueUiTx.setTitle('');

      this.stores.actionModals.open(IssueConfirmModal, {
        initData: {
          total: issueInfo.amount,
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
      console.log('### execute redeem finished');
    } catch (err) {
      console.log('### err execute redeem error', err);
      this.status = 'error';
      issueUiTx.setStatusFail();
    }
  }

  @action.bound
  public async openIssueDetailsModal(issueId: string, onClose?: () => void) {
    await this.loadIssueDetails(issueId);

    this.stores.actionModals.open(IssueDetailsModal, {
      initData: {
        issueId,
      },
      applyText: '',
      closeText: 'Close',
      noValidation: true,
      width: '80%',
      showOther: false,
      onApply: () => {
        this.stores.routing.goToIssue();
        return Promise.resolve();
      },
      onClose: () => {
        if (onClose) {
          onClose();
        }
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async openDepositModal(issueId: string) {
    await this.loadIssueDetails(issueId);
    this.stores.actionModals.open(IssueDepositModal, {
      applyText: 'I have made the payment',
      closeText: 'Close',
      initData: {
        issueId,
      },
      noValidation: true,
      width: '500px',
      showOther: false,
      onApply: () => {
        this.stores.routing.goToIssueModal(issueId, 'details');
        return Promise.resolve();
      },
      onClose: () => {
        this.status = 'cancel';
        this.stores.routing.goToIssue();
        return Promise.resolve();
      },
    });
  }

  public async loadVaults() {
    const response = await dashboardClient.loadVaultList({ size: 10, page: 0 });
    this._vaultList = response.content;
  }

  @get
  public get vaultList() {
    return this._vaultList.filter(vault => parseInt(vault.collateral, 10) > 0);
  }

  @action.bound
  public async loadIssueDetails(issueId: string) {
    try {
      const issue = await this.stores.issueStore.loadIssue(issueId);

      if (!issue) {
        return null;
      }

      return issue;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }

  @action.bound
  public async createIssue() {
    if (!this.stores.user.isAuthorized) {
      this.stores.user.openConnectWalletModal();
      return;
    }
    this.status = 'pending';
    const uiTxId = guid();
    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const vaultId = this.form.vaultId;

      console.log('### this.form.amount', this.form.amount);
      const issueAmount = bitcoinToSatoshi(this.form.amount);

      console.log('### Request Issue');

      issueUiTx.setStatusWaitingSignIn();
      issueUiTx.setTitle('Waiting to user to sign issue request');

      console.log('### issueAmount', issueAmount);

      const issueRequest = await hmyClient.requestIssue(
        issueAmount,
        vaultId,
        txHash => {
          issueUiTx.setTxHash(txHash);
          issueUiTx.setStatusProgress();
          issueUiTx.setTitle('Waiting for confirmation of issue request');
        },
      );

      console.log('### GetIssueDetails');
      issueUiTx.setStatusProgress();

      const issue = await retry(
        () => dashboardClient.loadIssue(issueRequest.issue_id),
        result => !!result,
      );

      issueUiTx.setIssueId(issue.id);

      issueUiTx.setStatusSuccess();
      issueUiTx.hideModal();

      this.stores.routing.goToIssueModal(issue.id, 'deposit');

      this.status = 'success';
    } catch (err) {
      issueUiTx.setStatusFail();
      issueUiTx.setError(err.message);
      // user: Error: MetaMask Tx Signature: User denied transaction signature.
      if (err.code === 4001) {
        issueUiTx.hideModal();
      }
      console.log('### Error during create issuePageStore', err);
      this.status = 'error';
    }
  }
}
