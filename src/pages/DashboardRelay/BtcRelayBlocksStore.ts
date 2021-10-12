import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { btcRelayClient } from '../../modules/btcRelay/btcRelayClient';
import { IEvent } from '../../modules/btcRelay/btcRelayTypes';

export class BtcRelayBlocksStore extends ListStoreConstructor<IEvent> {
  constructor(stores: IStores) {
    const loadEvents = params => {
      return btcRelayClient.loadEventList({
        size: params.size,
        page: params.page,
      });
    };
    const options = {
      pollingInterval: 10000,
    };
    super(stores, loadEvents, options);
  }
}
