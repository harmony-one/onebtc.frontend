import { InferValueTypes } from '../utils/types';

export const routes = {
  issue: '/bridge/issue/:issueTx?',
  redeem: '/bridge/redeem',
  transfer: '/bridge/transfer',
  sandbox: '/sandbox',
  burn: '/burn',
} as const;

export type Routes = InferValueTypes<typeof routes>;
