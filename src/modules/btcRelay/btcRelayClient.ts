import * as agent from 'superagent';
import {
  IBtcRelayEvent,
  IBtcRelayEvents,
  IBtcRelayInfo,
  IIssue,
  IIssueList,
  IPagination,
  IRedeem,
  IRedeemList,
  IVaultList,
} from './btcRelayTypes';
import { config } from '../../config';

export default class BtcRelayClient {
  static HOST = config.bitcoin.relayerHost.testnet;
  static loadEvents = async ({
    size = 10,
    page = 0,
  }: IPagination): Promise<IBtcRelayEvents> => {
    const res = await agent
      .get(BtcRelayClient.HOST + '/relay/events/data')
      .query({ size, page });

    return res.body;
  };

  static loadInfo = async (): Promise<IBtcRelayInfo> => {
    const res = await agent.get(BtcRelayClient.HOST + '/relay/events/info');

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
      .get(BtcRelayClient.HOST + '/issues/data')
      .query({ size, page });

    return res.body;
  };

  static loadVaultIssueList = async ({
    size,
    page,
    vaultId,
  }: IPagination & { vaultId: string }): Promise<IIssueList> => {
    const res = await agent
      .get(BtcRelayClient.HOST + `/issues/data?vault=${vaultId}`)
      .query({ size, page });

    return res.body;
  };

  static loadIssue = async (issueId: string): Promise<IIssue> => {
    const res = await agent.get(
      BtcRelayClient.HOST + `/issues/data/${issueId}`,
    );

    return res.body;
  };

  static loadRedeem = async (redeemId: string): Promise<IRedeem> => {
    const res = await agent.get(
      BtcRelayClient.HOST + `/redeems/data/${redeemId}`,
    );

    return res.body;
  };

  static loadRedeemList = async ({
    size,
    page,
  }: IPagination): Promise<IRedeemList> => {
    const res = await agent
      .get(BtcRelayClient.HOST + '/redeems/data')
      .query({ size, page });

    return res.body;
  };

  static loadVaultList = async ({
    size,
    page,
  }: IPagination): Promise<IVaultList> => {
    const res = await agent
      .get(BtcRelayClient.HOST + '/vaults/data')
      .query({ size, page });

    return res.body;
  };
}
