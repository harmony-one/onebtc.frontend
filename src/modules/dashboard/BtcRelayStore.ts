import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { dashboardClient } from './dashboardClient';
import { IEvent, IBtcRelayInfo, IRelayInfo } from './dashboardTypes';
import { BTCTx } from 'onebtc.sdk/lib/btcNode/types';
import { config } from '../../config';

export class BtcRelayStore extends StoreConstructor {
  @observable
  public info: IBtcRelayInfo = null;

  @observable
  public relayInfo: IRelayInfo = null;

  @observable
  public lastEvent: IEvent = null;

  @action.bound
  public async loadInfo() {
    this.relayInfo = await dashboardClient.loadRelayInfo();
    this.lastEvent = await dashboardClient.loadLastEvent();
    this.info = await dashboardClient.loadInfo();
  }

  @computed
  get lastBlockHeight() {
    if (this.lastEvent) {
      return Number(this.lastEvent.returnValues.height);
    }

    return 0;
  }

  isSynchronized() {
    return this.stores.btcNodeStore.lastBlockHeight === this.lastBlockHeight;
  }

  isRelayerHasConfirmation = (btcTx: BTCTx) => {
    if (!this.relayInfo) {
      return false;
    }

    return this.relayInfo.height >= this.getConfirmationHeight(btcTx);
  };

  getConfirmationHeight = (btcTx: BTCTx) => {
    return btcTx.height + config.bitcoin.waitConfirmationsCount - 1;
  };
}
