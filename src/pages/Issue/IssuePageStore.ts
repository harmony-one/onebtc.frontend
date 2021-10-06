import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, get, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import { IssueDepositModal } from './components/IssueDepositModal/IssueDepositModal';
import { IssueDetailsModal } from './components/IssueDetailsModal/IssueDetailsModal';
import { IssueConfirmModal } from './components/IssueConfirmModal';
import { guid } from '../../utils';
import { UITransaction } from '../../modules/uiTransaction/UITransactionsStore';
import {
  bitcoinToSatoshi,
  satoshiToBitcoin,
  walletHexToBech32,
} from '../../services/bitcoin';
import BtcRelayClient from '../../modules/btcRelay/btcRelayClient';
import { IIssue, IVault } from '../../modules/btcRelay/btcRelayTypes';
import { toBN } from 'web3-utils';

export interface ITransaction {
  amount: string;
  vaultId: string;
}

export class IssuePageStore extends StoreConstructor {
  defaultForm: ITransaction = {
    amount: '0.0001',
    vaultId: '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581',
  };

  @observable issuesMap: Record<string, IIssue> = {};

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;
  @observable vaultList: IVault[] = [];

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

  @action.bound
  async executeIssue(issueId: string, btcTransactionHash: string) {
    console.log('### executeIssue');
    this.status = 'pending';

    const uiTxId = guid();

    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.setStatusWaitingSignIn();
    issueUiTx.showModal();
    try {
      const issueInfo = this.getIssueInfo(issueId);

      const address = this.stores.user.address;

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);
      hmyClient.setUseMathWallet(true);

      console.log('### run execute issuePageStore');

      const result = await hmyClient.methods.executeIssue(
        address,
        issueInfo.issueId,
        btcTransactionHash,
        txHash => {
          issueUiTx.setTxHash(txHash);
          issueUiTx.setStatusProgress();
        },
      );
      console.log('### execute issuePageStore success');

      issueUiTx.setStatusSuccess();
      issueUiTx.hideModal();

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
      console.log('### execute issuePageStore finished');
    } catch (err) {
      console.log('### err mock execute issuePageStore error', err);
      this.status = 'error';
      issueUiTx.setStatusFail();
    }
  }

  @get
  public getIssueInfo(issueId: string) {
    const issue = this.issuesMap[issueId];

    if (!issue) {
      return null;
    }

    const btcRate = this.stores.user.btcRate;
    const amount = satoshiToBitcoin(issue.amount);
    const sendAmount = satoshiToBitcoin(
      toBN(issue.amount)
        .add(toBN(issue.fee))
        .toNumber(),
    );
    const sendUsdAmount = sendAmount * btcRate;
    const bridgeFee = satoshiToBitcoin(issue.fee);
    const totalReceived = amount;
    const totalReceivedUsd = totalReceived * btcRate;

    return {
      rawIssue: issue,
      amount: amount,
      issueId: issue.id,
      vaultId: issue.vault,
      requester: issue.requester,
      bitcoinAddress: walletHexToBech32(issue.btcAddress),
      sendAmount,
      sendUsdAmount,
      bridgeFee,
      totalReceived,
      totalReceivedUsd,
    };
  }

  @action.bound
  public openIssueDetailsModal(issueId: string, onClose?: () => void) {
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
          return Promise.resolve();
        }
        this.stores.routing.goToIssue();
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public openDepositModal(issueId: string) {
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
    const response = await BtcRelayClient.loadVaultList({ size: 10, page: 0 });
    this.vaultList = response.content;
  }

  @action.bound
  public async loadIssueDetails(issueId: string) {
    try {
      const issue = await BtcRelayClient.loadIssue(issueId);

      if (!issue) {
        return null;
      }

      this.issuesMap[issueId] = issue;
      return issue;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }

  @action.bound
  public async createIssue() {
    this.status = 'pending';
    const uiTxId = guid();
    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const vaultId = this.form.vaultId;
      hmyClient.setUseOneWallet(true);

      console.log('### this.form.amount', this.form.amount);
      const issueAmount = bitcoinToSatoshi(this.form.amount);

      console.log('### Request Issue');

      issueUiTx.setStatusWaitingSignIn();

      console.log('### issueAmount', issueAmount);

      const issueRequest = await hmyClient.methods.requestIssue(
        issueAmount,
        vaultId,
        txHash => {
          issueUiTx.setTxHash(txHash);
          issueUiTx.setStatusProgress();
        },
      );

      console.log('### GetIssueDetails');
      issueUiTx.setStatusProgress();

      const issueEvent = await hmyClient.methods.getIssueDetails(
        issueRequest.transactionHash,
      );

      if (!issueEvent) {
        throw new Error("Can't found issue details");
      }

      const issue = await BtcRelayClient.loadIssue(issueEvent.issue_id);

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
