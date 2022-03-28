import { ListStoreConstructor } from '../../../stores/core/ListStoreConstructor';
import stores from '../../../stores';
import { Operation, vaultClient } from '../../modules/vaultClient/VaultClient';

let cache: ListStoreConstructor<Operation> | null = null;

export const getOperationListStore = () => {
  if (cache) {
    return cache;
  }

  const loadFn = params => {
    return vaultClient.loadPayments({
      ...params,
      // vault: '0x09987640F35EAdA8801D13455A468E02ff964Dcd',
      vault: '0x297816FAEDB34eb8720dc6F5f001Ed64A5a83a9d',
      // vault: '0x22b7349c260277337b7E773dd223Cf04b25A6eE5'
    });
  };

  const store = new ListStoreConstructor<Operation>(stores, loadFn, {
    pollingInterval: 4000,
  });

  cache = store;

  return store;
};
