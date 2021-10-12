import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { IRedeem } from '../../../../modules/btcRelay/btcRelayTypes';
import { btcRelayClient } from '../../../../modules/btcRelay/btcRelayClient';

const cache: Record<string, ListStoreConstructor<IRedeem>> = {};

export const getVaultRedeemStore = vaultId => {
  if (cache[vaultId]) {
    return cache[vaultId];
  }

  const loadFn = params => {
    return btcRelayClient.loadRedeemList({
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
