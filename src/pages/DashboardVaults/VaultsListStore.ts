import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import BtcRelayClient, { IVault } from '../../modules/btcRelay/btcRelayClient';

export class VaultsListStore extends ListStoreConstructor<IVault> {
  constructor(stores: IStores) {
    const loadVaultList = params => {
      return BtcRelayClient.loadVaultList({
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
