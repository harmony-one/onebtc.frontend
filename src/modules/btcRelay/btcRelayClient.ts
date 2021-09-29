import * as agent from 'superagent';

export interface IBtcRelayEvent {
  _id: '6151c54109aef15268737323';
  address: '0x584fac530a2a822c0a38378185153083943ba287';
  topics: [
    '0xf8cc5afd35ef08d0a5642bf45fcd7181755072611677f47bbb11d6f254982247',
    '0x73f69215ae495446f4823b91132b7b3890482b0fae15a0e31500000000000000',
    '0x00000000000000000000000000000000000000000000000000000000001ff98c',
  ];
  data: '0x';
  blockNumber: 15222418;
  transactionHash: '0x60afb75ae26552a76c35befbac8e8be744e196da5f9c1d2b57e0acaf0069ea20';
  transactionIndex: '0x0';
  blockHash: '0x9b612e76da10f3f02a4069e103079d03fa1efaa049d15bcffe1dac83cf7cd35a';
  logIndex: '0x0';
  removed: false;
  name: 'StoreHeader';
  returnValues: {
    '0': '0x73f69215ae495446f4823b91132b7b3890482b0fae15a0e31500000000000000';
    '1': '2095500';
    __length__: 2;
    digest: '0x73f69215ae495446f4823b91132b7b3890482b0fae15a0e31500000000000000';
    height: '2095500';
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
  status: string;
  vault: string;
}

export interface IRedeem {
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
  status: string;
  vault: string;
}

interface IListContainer<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: string;
  page: string;
}

interface IVaultList extends IListContainer<IVault> {}

interface IIssueList extends IListContainer<IIssue> {}

interface IRedeemList extends IListContainer<IRedeem> {}

interface IBtcRelayEvents extends IListContainer<IBtcRelayEvent> {}

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

interface IPagination {
  size: number;
  page: number;
}

export default class BtcRelayClient {
  static loadEvents = async ({
    size = 10,
    page = 0,
  }: IPagination): Promise<IBtcRelayEvents> => {
    const res = await agent
      .get('https://relayer.btc.test.hmny.io/relay/events/data')
      .query({ size, page });

    return res.body;
  };

  static loadInfo = async (): Promise<IBtcRelayInfo> => {
    const res = await agent.get(
      'https://relayer.btc.test.hmny.io/relay/events/info',
    );

    return res.body;
  };

  static loadLastEvent = async (): Promise<IBtcRelayEvent> => {
    const events = await BtcRelayClient.loadEvents({
      size: 1,
      page: 0,
    });
    return events.content[0];
  };

  static loadIssueList = async ({
    size,
    page,
  }: IPagination): Promise<IIssueList> => {
    const res = await agent
      .get('https://relayer.btc.test.hmny.io/issues/data')
      .query({ size, page });

    return res.body;
  };

  static loadRedeemList = async ({
    size,
    page,
  }: IPagination): Promise<IRedeemList> => {
    const res = await agent
      .get('https://relayer.btc.test.hmny.io/redeems/data')
      .query({ size, page });

    return res.body;
  };

  static loadVaultList = async ({
    size,
    page,
  }: IPagination): Promise<IVaultList> => {
    const res = await agent
      .get('https://relayer.btc.test.hmny.io/vaults/data')
      .query({ size, page });

    return res.body;
  };
}
