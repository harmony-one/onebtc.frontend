import { StoreConstructor } from './core/StoreConstructor';
import { issue_tx_mock } from 'onebtc.sdk/lib/helpers';
import * as bitcoin from 'bitcoinjs-lib';
import utils from 'web3-utils';
import { action, autorun, computed, observable } from 'mobx';
import { getHmyClient } from 'services/hmyClient';
import { DepositModal } from '../pages/CreateIssuePage/components/DepositModal';
import { TransactionModal } from '../pages/CreateIssuePage/components/TransactionModal';
import { ProgressModal } from '../pages/CreateIssuePage/components/ProgressModal';
import { ReceivedModal } from '../pages/CreateIssuePage/components/ReceivedModal';
import * as agent from 'superagent';
import { IOperation } from './interfaces';

export interface ITransaction {
  amount: string;
  vaultId: string;
}

interface IIssueRequest {
  blockHash: string;
  blockNumber: number;
  contractAddress: null;
  cumulativeGasUsed: 262520;
  events: { LockCollateral: {}; IssueRequest: {} };
  gasUsed: number;
  logsBloom: string;
  status: boolean;
  to: string;
  from: string;
  transactionHash: string;
}

interface IIssueEvent {
  issue_id: string;
  requester: string;
  vault_id: string;
  amount: string;
  fee: string;
  btc_address: string;
}

export class IssueStore extends StoreConstructor {
  defaultTransaction: ITransaction = {
    amount: '0.00001',
    vaultId: '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581',
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

  @observable transaction = this.defaultTransaction;

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
    return (Number(this.transaction.amount) * 2) / 1000;
  }

  @computed
  get totalReceive() {
    return Number(this.transaction.amount) - this.bridgeFee;
  }

  @action.bound
  showLockModal() {
    this.stores.actionModals.open(ProgressModal, {
      title: 'Some Title',
      applyText: '',
      closeText: '',
      noValidation: true,
      width: '320px',
      showOther: false,
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }

  @action.bound
  hideLockModal() {
    this.stores.actionModals.closeLastModal();
  }

  async loadBtcTx(btcAddress: string) {
    const res = await agent.get<{ body: IOperation }>(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${btcAddress}`,
    );

    return res.body;
  }

  @action.bound
  createBtcTxWatcher(transactionHash: string) {
    const issue = this.issuesMap[transactionHash];

    const idx = setTimeout(async () => {
      const res = await this.loadBtcTx(issue.btcAddress);

      if (res.txrefs.length) {
        console.log('### execute issue');
        // this.executeIssue();
        clearTimeout(idx);
        return;
      }

      this.createBtcTxWatcher(transactionHash);
    }, 3000);
  }

  @action.bound
  public openTransactionModal(transactionHash: string) {
    this.stores.actionModals.open(TransactionModal, {
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
        return Promise.resolve();
      },
      onClose: () => {
        console.log('### onCLose');
        return this.mockExecuteIssue(transactionHash);
      },
    });
  }

  @action.bound
  public async mockExecuteIssue(transactionHash: string) {
    console.log('### mockExecuteIssue');
    this.status = 'pending';

    this.showLockModal();
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

      const hmyClient = await getHmyClient();

      console.log('### run execute issue');

      await hmyClient.methods.executeIssue(
        address,
        // @ts-ignore
        issue.issueEvent.issue_id,
        proofMock,
        btcTx.toBuffer(),
        heightAndIndex,
        headerMock,
      );
      console.log('### execute issue success');
      this.hideLockModal();

      this.stores.actionModals.open(ReceivedModal, {
        title: 'Some Title',
        initData: {
          total: Number(issue.issueEvent.amount) * 1e9,
        },
        applyText: 'Continue',
        closeText: '',
        noValidation: true,
        width: '80%',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';
      console.log('### execute issue finished');
    } catch (err) {
      console.log('### err mock execute issue error', err);
      this.status = 'error';
      this.hideLockModal();
    }
  }

  @action.bound
  public async createIssue() {
    this.status = 'pending';
    this.showLockModal();

    try {
      const hmyClient = await getHmyClient();

      const vaultId = this.transaction.vaultId;
      hmyClient.setUseOneWallet(true);
      const issueAmount = Number(this.transaction.amount) * 1e9;

      const createdAt = new Date();

      const issueRequest: IIssueRequest = await hmyClient.methods.requestIssue(
        issueAmount,
        vaultId,
      );

      const issueEvent: IIssueEvent = await hmyClient.methods.getIssueDetails(
        issueRequest.transactionHash,
      );

      console.log('### issueRequest', issueRequest);
      console.log('### issueEvent', issueEvent);

      const btcBase58Address = bitcoin.address.toBase58Check(
        Buffer.from(issueEvent.btc_address.slice(2), 'hex'),
        0,
      );

      const btcAddress = bitcoin.address.toBech32(
        Buffer.from(issueEvent.btc_address.slice(2), 'hex'),
        0,
        'tb',
      );

      this.issuesMap[issueRequest.transactionHash] = {
        issueAmount,
        vaultId,
        issueEvent,
        btcBase58Address,
        btcAddress,
      };

      this.hideLockModal();

      this.createBtcTxWatcher(issueRequest.transactionHash);

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
          this.openTransactionModal(issueRequest.transactionHash);
          return Promise.resolve();
        },
        onClose: () => {
          console.log('### arguments');
          this.status = 'cancel';
          return Promise.resolve();
        },
      });

      this.status = 'success';
    } catch (err) {
      this.hideLockModal();
      console.log('### Error during create issue', err);
      this.status = 'error';
    }
  }
}
