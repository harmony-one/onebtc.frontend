import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { btcNodeClient, BTCNodeInfo } from './btcNodeClient';

export class BTCNodeStore extends StoreConstructor {
  @observable
  basicInfo: BTCNodeInfo = null;

  @observable
  fee: number = 0;

  @computed
  get lastBlockHeight() {
    if (this.basicInfo) {
      return this.basicInfo.chain.height;
    }

    return 0;
  }

  @action.bound
  public async loadBasicInfo() {
    this.basicInfo = await btcNodeClient.loadBasicInfo();
    this.fee = await btcNodeClient.loadFee();
  }
}
