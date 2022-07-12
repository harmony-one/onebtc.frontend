import { ListStoreConstructor } from '../../../stores/core/ListStoreConstructor';
import stores from '../../../stores';
import { Operation, vaultClient } from '../../modules/vaultClient/VaultClient';

let cache: ListStoreConstructor<Operation> | null = null;

let vaultAddress  = '';

export const getOperationListStore = () => {
  if (cache) {
    return cache;
  }

  const loadFn = async params => {
    if (!vaultAddress) {
      const info = await vaultClient.loadInfo();
      vaultAddress = info.vaultAddress;
    }

    return await vaultClient.loadPayments({
      ...params,
      vault: vaultAddress,
    });
  };

  const store = new ListStoreConstructor<Operation>(stores, loadFn, {
    pollingInterval: 4000,
  });

  cache = store;

  return store;
};
