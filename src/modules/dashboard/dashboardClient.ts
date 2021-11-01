import { config } from '../../config';
import { DashboardApi } from 'onebtc.sdk/lib/dashboard-api';

export const dashboardClient = new DashboardApi({
  dashboardUrl: config.bitcoin.dashboardHost.testnet,
  btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
});
