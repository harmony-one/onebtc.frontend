import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import { IEvent } from '../../modules/dashboard/dashboardTypes';

export class BtcRelayBlocksStore extends ListStoreConstructor<IEvent> {
  constructor(stores: IStores) {
    const loadEvents = params => {
      return dashboardClient.loadEventList({
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
