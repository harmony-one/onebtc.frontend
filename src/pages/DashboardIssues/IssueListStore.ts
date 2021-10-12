import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import { btcRelayClient } from '../../modules/btcRelay/btcRelayClient';
import { IIssue } from '../../modules/btcRelay/btcRelayTypes';

export class IssueListStore extends ListStoreConstructor<IIssue> {
  constructor(stores: IStores) {
    const loadIssueList = params => {
      return btcRelayClient.loadIssueList({
        size: params.size,
        page: params.page,
      });
    };

    const options = {
      pollingInterval: 10000,
    };
    super(stores, loadIssueList, options);
  }
}
