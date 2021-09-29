import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import BtcRelayClient, { IIssue } from '../../modules/btcRelay/btcRelayClient';

export class IssueListStore extends ListStoreConstructor<IIssue> {
  constructor(stores: IStores) {
    const loadIssueList = params => {
      return BtcRelayClient.loadIssueList({
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
