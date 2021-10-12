import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { btcRelayClient } from '../../modules/btcRelay/btcRelayClient';
import { IVault } from '../../modules/btcRelay/btcRelayTypes';

export class VaultsListStore extends ListStoreConstructor<IVault> {
  constructor(stores: IStores) {
    const loadVaultList = params => {
      return btcRelayClient.loadVaultList({
        size: params.size,
        page: params.page,
      });
    };

    const options = {
      pollingInterval: 10000,
    };
    super(stores, loadVaultList, options);
  }
}
