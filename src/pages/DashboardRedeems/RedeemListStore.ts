import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import BtcRelayClient, { IRedeem } from '../../modules/btcRelay/btcRelayClient';

export class RedeemListStore extends ListStoreConstructor<IRedeem> {
  constructor(stores: IStores) {
    const loadRedeemList = params => {
      return BtcRelayClient.loadRedeemList({
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
