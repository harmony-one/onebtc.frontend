import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import { IIssue } from '../../modules/dashboard/dashboardTypes';

export class IssueListStore extends ListStoreConstructor<IIssue> {
  constructor(stores: IStores) {
    const loadIssueList = params => {
      return dashboardClient.loadIssueList({
        size: params.size,
        page: params.page,
        // @ts-expect-error 'sort' does not exist in type 'IGetParams'
        sort: params.sort,
      });
    };

    const options = {
      pollingInterval: 10000,
    };
    super(stores, loadIssueList, options);
  }
}
