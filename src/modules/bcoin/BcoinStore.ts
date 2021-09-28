import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { BcoinClient, IBcoinBasicInfo } from './bcoinClient';

export class BcoinStore extends StoreConstructor {
  @observable
  basicInfo: IBcoinBasicInfo = null;

  @computed
  get lastBlockHeight() {
    if (this.basicInfo) {
      return this.basicInfo.chain.height;
    }

    return 0;
  }

  @action.bound
  public async loadBasicInfo() {
    this.basicInfo = await BcoinClient.loadBasicInfo();
  }
}
