import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { dashboardClient } from './dashboardClient';
import { IEvent, IBtcRelayInfo } from './dashboardTypes';

export class BtcRelayStore extends StoreConstructor {
  @observable
  public info: IBtcRelayInfo = null;

  @observable
  public lastEvent: IEvent = null;

  @action.bound
  public async loadInfo() {
    this.info = await dashboardClient.loadInfo();
    this.lastEvent = await dashboardClient.loadLastEvent();
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
    return this.stores.btcNodeStore.lastBlockHeight === this.lastBlockHeight;
  }
}
