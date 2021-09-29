import { InferValueTypes } from '../utils/types';

export const routes = {
  bridge: '/bridge/issue',
  issue: '/bridge/issue/:issueTx?/:modal(deposit|details)?',
  redeem: '/bridge/redeem/:redeemTx?/:modal(withdraw|details)?',
  transfer: '/bridge/transfer',
  sandbox: '/sandbox',
  burn: '/bridge/burn',
  myTransactions: '/bridge/myTransactions',
  dashboard: '/dashboard',
  dashboardRelay: '/dashboard/relay',
  dashboardIssue: '/dashboard/issues',
  dashboardRedeem: '/dashboard/redeem',
  dashboardVault: '/dashboard/vault',
} as const;

export type Routes = InferValueTypes<typeof routes>;
