import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { IIssue } from '../../../../modules/btcRelay/btcRelayTypes';
import { btcRelayClient } from '../../../../modules/btcRelay/btcRelayClient';

const cache: Record<string, ListStoreConstructor<IIssue>> = {};

export const getVaultIssuesStore = vaultId => {
  if (cache[vaultId]) {
    return cache[vaultId];
  }

  const loadFn = params => {
    return btcRelayClient.loadIssueList({
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
