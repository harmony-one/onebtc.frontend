import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import { IRedeem } from '../../modules/dashboard/dashboardTypes';

export class RedeemListStore extends ListStoreConstructor<IRedeem> {
  constructor(stores: IStores) {
    const loadRedeemList = params => {
      return dashboardClient.loadRedeemList({
        size: params.size,
        page: params.page,
      });
    };

    const options = {
      pollingInterval: 10000,
    };
    super(stores, loadRedeemList, options);
  }
}
