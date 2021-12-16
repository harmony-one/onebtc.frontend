import { ListStoreConstructor } from '../../../stores/core/ListStoreConstructor';
import stores from '../../../stores';
import { Operation, vaultClient } from '../../modules/vaultClient/VaultClient';

let cache: ListStoreConstructor<Operation> | null = null;

export const getOperationListStore = () => {
  if (cache) {
    return cache;
  }

  const loadFn = params => {
    return vaultClient.loadOperations({
      ...params,
    });
  };

  const store = new ListStoreConstructor<Operation>(stores, loadFn, {
    pollingInterval: 10000,
  });

  cache = store;

  return store;
};
