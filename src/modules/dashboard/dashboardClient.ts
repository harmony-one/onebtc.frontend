import { config } from '../../config';
import { DashboardApi } from 'onebtc.sdk/lib/dashboard-api';

export const dashboardClient = new DashboardApi({
  dashboardUrl: config.harmony.dashboardUrl,
  btcNodeUrl: config.bitcoin.btcNodeUrl,
  networkType: config.network,
});
