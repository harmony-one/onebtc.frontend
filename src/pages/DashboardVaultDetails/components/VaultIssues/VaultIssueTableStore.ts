import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { dashboardClient } from '../../../../modules/dashboard/dasboardClient';
import { IIssue } from '../../../../modules/btcRelay/btcRelayTypes';

const cache: Record<string, ListStoreConstructor<IIssue>> = {};

export const getVaultIssuesStore = vaultId => {
  if (cache[vaultId]) {
    return cache[vaultId];
  }

  const loadFn = params => {
    return dashboardClient.getIssues({
      vault: vaultId,
      ...params,
    });
  };

  const vaultBalancesStore = new ListStoreConstructor<IIssue>(stores, loadFn, {
    pollingInterval: 10000,
  });

  cache[vaultId] = vaultBalancesStore;

  return vaultBalancesStore;
};
