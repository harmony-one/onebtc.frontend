import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { dashboardClient } from '../../../../modules/dashboard/dasboardClient';
import { IRedeem } from '../../../../modules/btcRelay/btcRelayTypes';

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
