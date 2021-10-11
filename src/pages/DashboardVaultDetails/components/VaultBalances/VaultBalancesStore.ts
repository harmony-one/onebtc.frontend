import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { dashboardClient } from '../../../../modules/dashboard/dasboardClient';

const cache: Record<string, ListStoreConstructor<{ address: string }>> = {};

export const getVaultBalancesStore = vaultId => {
  if (cache[vaultId]) {
    return cache[vaultId];
  }

  const loadFn = () => {
    return dashboardClient.loadVaultBalances(vaultId);
  };

  const vaultBalancesStore = new ListStoreConstructor(stores, loadFn, {
    pollingInterval: 10000,
  });

  cache[vaultId] = vaultBalancesStore;

  return vaultBalancesStore;
};
