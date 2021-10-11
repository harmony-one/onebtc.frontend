import { DashboardApi } from 'onebtc.sdk';
import { config } from '../../config';

export const dashboardClient = new DashboardApi({
  dashboardUrl: config.bitcoin.relayerHost.testnet,
  btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
});
