import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { IStores } from '../../stores';
import BtcRelayClient from '../../modules/btcRelay/btcRelayClient';
import { IRedeem } from '../../modules/btcRelay/btcRelayTypes';

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
