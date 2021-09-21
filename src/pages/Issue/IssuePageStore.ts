import { StoreConstructor } from '../../stores/core/StoreConstructor';
import * as bitcoin from 'bitcoinjs-lib';
import utils from 'web3-utils';
import { action, autorun, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import { DepositModal } from './components/DepositModal';
import { IssueTransactionModal } from './components/IssueTransactionModal/IssueTransactionModal';
import { IssueConfirmModal } from './components/IssueConfirmModal';
import * as agent from 'superagent';
import { IOperation } from '../../stores/interfaces';
import { guid } from '../../utils';
import { UITransaction } from '../../stores/UITransactionsStore';
import {
  satoshiToBitcoin,
  walletHexToBase58,
  walletHexToBech32,
} from '../../services/bitcoin';
import { issue_tx_mock } from 'onebtc.sdk/lib/helpers';
import { IssueDetails } from 'onebtc.sdk/lib/blockchain/hmy/types';

export interface ITransaction {
  amount: string;
  vaultId: string;
}

export class IssuePageStore extends StoreConstructor {
  defaultForm: ITransaction = {
    amount: '0.0001',
    vaultId: '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581',
  };

  @observable issuesMap: {
    [key: string]: {
      issueAmount: number;
      vaultId: string;
      issueEvent: IssueDetails;
      btcBase58Address: string;
      btcAddress: string;
    };
  } = {};

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;

  constructor(stores) {
    super(stores);

    // 1DVFsQexdyjq9gGn9rC5Zt9VeHhXkYVxHd
    // tb1q84p6j4r0v9tngw44u68kacx8xq709yu6056dmp
    autorun(() => {
      // this.createBtcTxWatcher();
    });
  }

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

  async loadBtcTx(btcAddress: string) {
    const res = await agent.get<{ body: IOperation }>(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${btcAddress}`,
    );

    return res.body;
  }

  @action.bound
  async executeIssue(transactionHash: string, btcTransactionHash: string) {
    console.log('### executeIssue');
    this.status = 'pending';

    const uiTxId = guid();

    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.setStatusWaitingSignIn();
    issueUiTx.showModal();
    try {
      const issue = this.issuesMap[transactionHash];

      const btcBlockNumberMock = 1000;
      const btcTxIndexMock = 2;
      const heightAndIndex = (btcBlockNumberMock << 32) | btcTxIndexMock;
      const headerMock = Buffer.alloc(0);
      const proofMock = Buffer.alloc(0);

      const address = this.stores.user.address;

      const bitcoinHexAddress = issue.issueEvent.btc_address;
      const btcBase58Address = bitcoin.address.toBase58Check(
        Buffer.from(bitcoinHexAddress.slice(2), 'hex'),
        0,
      );

      const issueId = utils.toBN(issue.issueEvent.issue_id);
      const btcTx = issue_tx_mock(
        // @ts-ignore
        issueId,
        btcBase58Address,
        issue.issueAmount,
      );

      console.log('### btcBase58', btcBase58Address);

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);
      hmyClient.setUseMathWallet(true);

      console.log('### run execute issuePageStore');

      const result = await hmyClient.methods.executeIssue(
        address,
        // @ts-ignore
        issue.issueEvent.issue_id,
        proofMock,
        btcTx.toBuffer(),
        heightAndIndex,
        headerMock,
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
          total: satoshiToBitcoin(issue.issueEvent.amount),
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

  @action.bound
  createBtcTxWatcher(transactionHash: string) {
    const issue = this.issuesMap[transactionHash];

    const makeRequest = async () => {
      console.log('### createTimeout');

      try {
        const res = await this.loadBtcTx(issue.btcAddress);

        console.log('### res', res);
        if (res.txrefs.length) {
          console.log('### execute issue');

          const btcTx = res.tx[0].tx_hash;
          this.executeIssue(transactionHash, btcTx);
          return;
        }

        console.log('### next');
      } catch (err) {
        this.createBtcTxWatcher(transactionHash);
      }
    };

    setTimeout(() => {
      makeRequest();
    }, 10000);
  }

  @action.bound
  public openTransactionModal(transactionHash: string) {
    this.stores.actionModals.open(IssueTransactionModal, {
      title: 'Some Title',
      initData: {
        transactionHash,
      },
      applyText: 'Continue',
      closeText: 'Execute issue with mock Tx',
      noValidation: true,
      width: '80%',
      showOther: true,
      onApply: () => {
        this.stores.routing.goToIssue();
        return Promise.resolve();
      },
      onClose: () => {
        return this.mockExecuteIssue(transactionHash);
      },
    });
  }

  @action.bound
  public async mockExecuteIssue(transactionHash: string) {
    console.log('### mockExecuteIssue');
    this.status = 'pending';
    const uiTxId = guid();
    const issueUiTx = this.createUiTx(uiTxId);
    issueUiTx.setStatusProgress();
    issueUiTx.showModal();
    try {
      const issue = this.issuesMap[transactionHash];

      const btcBlockNumberMock = 1000;
      const btcTxIndexMock = 2;
      const heightAndIndex = (btcBlockNumberMock << 32) | btcTxIndexMock;
      const headerMock = Buffer.alloc(0);
      const proofMock = Buffer.alloc(0);

      const address = this.stores.user.address;

      const issueId = utils.toBN(issue.issueEvent.issue_id);
      console.log('### issueId BN', issueId);
      const btcTx = issue_tx_mock(
        // @ts-ignore
        issueId,
        issue.btcBase58Address,
        issue.issueAmount,
      );

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      console.log('### run execute issuePageStore');

      issueUiTx.setStatusWaitingSignIn();

      const result = await hmyClient.methods.executeIssue(
        address,
        // @ts-ignore
        issue.issueEvent.issue_id,
        proofMock,
        btcTx.toBuffer(),
        heightAndIndex,
        headerMock,
        txHash => {
          issueUiTx.setTxHash(txHash);
          issueUiTx.setStatusProgress();
        },
      );
      console.log('### execute issuePageStore success');
      issueUiTx.hideModal();
      issueUiTx.setStatusSuccess();

      this.stores.actionModals.open(IssueConfirmModal, {
        initData: {
          total: satoshiToBitcoin(issue.issueEvent.amount),
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
      debugger;
      console.log('### err mock execute issuePageStore error', err);
      this.status = 'error';
      issueUiTx.setError(err);
      issueUiTx.setStatusFail();
    }
  }

  @action.bound
  public async showIssueDetails(txHash: string) {
    const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

    const issueDetails = await hmyClient.methods.getIssueDetails(txHash);

    if (!issueDetails) {
      return;
    }

    console.log('### issueDetails', issueDetails);
    this.issuesMap[txHash] = {
      issueAmount: Number(issueDetails.amount),
      vaultId: issueDetails.vault_id,
      issueEvent: issueDetails,
      btcBase58Address: walletHexToBase58(issueDetails.btc_address),
      btcAddress: walletHexToBech32(issueDetails.btc_address),
    };

    this.openTransactionModal(txHash);
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
      const issueAmount = Number(this.form.amount) * 1e9;

      console.log('### Request Issue');

      // switch status: waiting for sign in
      issueUiTx.setStatusWaitingSignIn();

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

      // add transaction data: issueId
      issueUiTx.setIssueId(issueEvent.issue_id);

      const btcAddress = walletHexToBech32(issueEvent.btc_address);
      const btcBase58Address = walletHexToBase58(issueEvent.btc_address);
      console.log('### issueRequest', issueRequest);
      console.log('### issueEvent', issueEvent);
      console.log('### btcBase58Address', btcBase58Address);
      console.log('### btcAddress', btcAddress);

      this.issuesMap[issueRequest.transactionHash] = {
        issueAmount,
        vaultId,
        issueEvent,
        btcBase58Address,
        btcAddress,
      };

      issueUiTx.setStatusSuccess();
      issueUiTx.hideModal();

      this.stores.actionModals.open(DepositModal, {
        title: 'Some Title',
        applyText: 'I have made the payment',
        initData: {
          transactionHash: issueRequest.transactionHash,
        },
        closeText: 'Cancel',
        noValidation: true,
        width: '500px',
        showOther: true,
        onApply: () => {
          this.stores.routing.goToIssue(issueRequest.transactionHash);
          return Promise.resolve();
        },
        onClose: () => {
          this.status = 'cancel';
          return Promise.resolve();
        },
      });

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
