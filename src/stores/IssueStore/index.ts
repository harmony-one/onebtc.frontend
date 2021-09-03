import { StoreConstructor } from '../core/StoreConstructor';
import { getHmyClient } from 'onebtc.sdk';
import { issue_tx_mock } from 'onebtc.sdk/lib/helpers';
import * as bitcoin from 'bitcoinjs-lib'
import utils from 'web3-utils'
import { action, autorun, computed, observable } from 'mobx';
import { EXCHANGE_MODE } from '../interfaces';


export interface ITransaction {
  amount: string;
}

export class IssueStore extends StoreConstructor {

  defaultTransaction: ITransaction = {
    amount: '0.0',
  };

  @observable status: 'init' | 'pending' | 'success' | 'error' = 'init';


  @observable transaction = this.defaultTransaction;

  constructor(stores) {
    super(stores);
  }

  @computed
  get bridgeFee() {
    return Number(this.transaction.amount) * 2 / 1000;
  }

  @computed
  get totalReceive() {
    return Number(this.transaction.amount) - this.bridgeFee;
  }


  @action.bound
  public async createIssue() {
    this.status = 'pending';

    try {
      const hmyClient = await getHmyClient({
        sdk: "web3",
        nodeURL: "https://api.s0.b.hmny.io",
        chainId: 2,
        contractAddress: "0x45b24bE9F317054B4D5972E9d685f6e403772f6b",
        gasLimit: 6721900,
      });

      hmyClient.setUseOneWallet(true);
      const issueAmount = Number(this.transaction.amount) * 1e9;
      console.log('### issueAmount', issueAmount);
      const IssueRequest = await hmyClient.methods.requestIssue(issueAmount, '0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581');

      console.log('### IssueRequest', IssueRequest);

      const IssueEvent = await hmyClient.methods.getIssueDetails(
        IssueRequest.transactionHash
      );

      console.log('### IssueEvent', IssueEvent);

      const issue_id = IssueEvent.issue_id;
      const btc_address = IssueEvent.btc_address;
      const btc_base58 = bitcoin.address.toBase58Check(
        Buffer.from(btc_address.slice(2), "hex"),
        0
      );

      const issueId = utils.toBN(issue_id);
      console.log('### issue_id', issue_id);
      console.log('### issueId', issueId);

      const btcTx = issue_tx_mock(
      // @ts-ignore
        issueId,
        btc_base58,
        issueAmount
      );
      const btcBlockNumberMock = 1000;
      const btcTxIndexMock = 2;
      const heightAndIndex = (btcBlockNumberMock << 32) | btcTxIndexMock;
      const headerMock = Buffer.alloc(0);
      const proofMock = Buffer.alloc(0);

      const address = this.stores.user.address;

      await hmyClient.methods.executeIssue(
        address,
        issue_id,
        proofMock,
        btcTx.toBuffer(),
        heightAndIndex,
        headerMock
      );

      console.log('### end');
      this.status = 'success';
    } catch (err) {
      console.log('### err', err);
      this.status = 'error';
    }
  }
}
