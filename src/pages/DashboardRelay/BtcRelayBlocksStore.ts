import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import BtcRelayClient from '../../modules/btcRelay/btcRelayClient';
import { IBtcRelayEvent } from '../../modules/btcRelay/btcRelayTypes';

export class BtcRelayBlocksStore extends ListStoreConstructor<IBtcRelayEvent> {
  constructor(stores: IStores) {
    const loadEvents = params => {
      return BtcRelayClient.loadEvents({
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
