import { config } from '../../config';
import { DashboardApi } from 'onebtc.sdk/lib/dashboard-api';

export const dashboardClient = new DashboardApi({
  dashboardUrl: config.harmony.dashboardHost,
  btcNodeUrl: config.bitcoin.btcNodeUrl,
});
