import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import BtcRelayClient, {
  IBtcRelayEvent,
} from '../../modules/btcRelay/btcRelayClient';

export class RelayBlocksStore extends ListStoreConstructor<IBtcRelayEvent> {
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
