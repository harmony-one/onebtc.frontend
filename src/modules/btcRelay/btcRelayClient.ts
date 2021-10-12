import { config } from '../../config';
import { DashboardApi } from 'onebtc.sdk/lib/dashboard-api';

export const btcRelayClient = new DashboardApi({
  dashboardUrl: config.bitcoin.relayerHost.testnet,
  btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
});
