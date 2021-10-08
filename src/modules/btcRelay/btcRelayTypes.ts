import { IssueStatus, RedeemStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';

export interface IBtcRelayEvent {
  _id: string;
  address: string;
  topics: string[];
  data: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
  name: 'StoreHeader';
  returnValues: {
    digest: string;
    height: string;
  };
}

export interface IVault {
  id: string;
  btcPublicKeyX: string;
  btcPublicKeyY: string;
  collateral: string;
  issued: string;
  lastUpdate: number;
  replaceCollateral: string;
  toBeIssued: string;
  toBeRedeemed: string;
  toBeReplaced: string;
  lastPing: number;
}

export interface BTCTransaction {
  hash: string;
  confirmations: number;
  outputs: { value: number; script: string; address: string }[];
}

export interface IIssue {
  id: string;
  amount: string;
  btcAddress: string;
  btcHeight: string;
  btcPublicKey: null;
  fee: string;
  griefingCollateral: string;
  lastUpdate: number;
  opentime: string;
  period: string;
  requester: string;
  status: IssueStatus;
  vault: string;
  btcTx: BTCTransaction;
}

export interface IRedeem {
  id: string;
  amountBtc: string;
  amountOne: string;
  btcAddress: string;
  btcHeight: string;
  btcPublicKey: null;
  fee: string;
  griefingCollateral: string;
  lastUpdate: number;
  opentime: string;
  period: string;
  requester: string;
  status: RedeemStatus;
  vault: string;
  btcTx: BTCTransaction;
}

interface IListContainer<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: string;
  page: string;
}

export interface IVaultList extends IListContainer<IVault> {}

export interface IIssueList extends IListContainer<IIssue> {}

export interface IRedeemList extends IListContainer<IRedeem> {}

export interface IBtcRelayEvents extends IListContainer<IBtcRelayEvent> {}

export interface IBtcRelayInfo {
  totalLogs: number;
  progress: string;
  lastBlock: number;
  lastNodeBlock: number;
  lastSuccessfulRead: number;
  blocksInterval: number;
  dbCollectionPrefix: 'relay-events';
  contractAddress: string;
  waitInterval: number;
}

export interface IPagination {
  size: number;
  page: number;
}
