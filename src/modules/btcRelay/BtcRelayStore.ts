import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import BtcRelayClient from './btcRelayClient';
import { IBtcRelayEvent, IBtcRelayInfo } from './btcRelayTypes';

export class BtcRelayStore extends StoreConstructor {
  @observable
  public info: IBtcRelayInfo = null;

  @observable
  public lastEvent: IBtcRelayEvent = null;

  @action.bound
  public async loadInfo() {
    this.info = await BtcRelayClient.loadInfo();
    this.lastEvent = await BtcRelayClient.loadLastEvent();
  }

  @computed
  get lastBlockHeight() {
    if (this.lastEvent) {
      return Number(this.lastEvent.returnValues.height);
    }

    return 0;
  }

  @computed
  get isSynchronized() {
    return this.stores.bcoinStore.lastBlockHeight === this.lastBlockHeight;
  }
}
