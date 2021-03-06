import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import { IVault } from '../../modules/dashboard/dashboardTypes';

export class DashboardVaultsListStore extends ListStoreConstructor<IVault> {
  constructor(stores: IStores) {
    const loadVaultList = params => {
      return dashboardClient.loadVaultList({
        size: params.size,
        page: params.page,
        // @ts-expect-error 'sort' does not exist in type 'IGetParams'
        sort: params.sort,
        hasCollateral: '1',
      });
    };

    const options = {
      pollingInterval: 10000,
      paginationData: {
        pageSize: 50,
      },
    };
    super(stores, loadVaultList, options);
  }
}
