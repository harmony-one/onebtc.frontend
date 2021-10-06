import { InferValueTypes } from '../utils/types';

export const routes = {
  bridge: '/bridge/issue',
  issue: '/bridge/issue/:issueId?/:modal(deposit|details)?',
  redeem: '/bridge/redeem/:redeemId?/:modal(withdraw|details)?',
  transfer: '/bridge/transfer',
  sandbox: '/sandbox',
  burn: '/bridge/burn',
  myTransactions: '/bridge/myTransactions',
  dashboard: '/dashboard',
  dashboardRelay: '/dashboard/relay',
  dashboardIssue: '/dashboard/issues/:issueId?',
  dashboardRedeem: '/dashboard/redeem/:redeemId?',
  dashboardVault: '/dashboard/vaults',
  dashboardVaultDetails: '/dashboard/vaults/:vaultId',
} as const;

export type Routes = InferValueTypes<typeof routes>;
