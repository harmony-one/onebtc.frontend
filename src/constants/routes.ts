import { InferValueTypes } from '../utils/types';

export const routes = {
  issue: '/bridge/issue/:issueTx?/:modal(deposit|details)?',
  redeem: '/bridge/redeem',
  transfer: '/bridge/transfer',
  sandbox: '/sandbox',
  burn: '/bridge/burn',
} as const;

export type Routes = InferValueTypes<typeof routes>;
