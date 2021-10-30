import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { IRedeem } from '../../../../modules/dashboard/dashboardTypes';
import { dashboardClient } from '../../../../modules/dashboard/dashboardClient';

const cache: Record<string, ListStoreConstructor<IRedeem>> = {};

export const getVaultRedeemStore = vaultId => {
  if (cache[vaultId]) {
    return cache[vaultId];
  }

  const loadFn = params => {
    return dashboardClient.loadRedeemList({
      vault: vaultId,
      ...params,
    });
  };

  const vaultBalancesStore = new ListStoreConstructor<IRedeem>(stores, loadFn, {
    pollingInterval: 10000,
  });

  cache[vaultId] = vaultBalancesStore;

  return vaultBalancesStore;
};
