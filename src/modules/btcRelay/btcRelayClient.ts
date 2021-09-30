import * as agent from 'superagent';
import {
  IBtcRelayEvent,
  IBtcRelayEvents,
  IBtcRelayInfo,
  IIssueList,
  IPagination,
  IRedeemList,
  IVaultList,
} from './btcRelayTypes';

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
