import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { btcNodeClient, BTCNodeInfo } from './btcNodeClient';
import axios from 'axios';

export class BTCNodeStore extends StoreConstructor {
  @observable
  basicInfo: BTCNodeInfo = null;

  @observable
  fee: number = 0;

  @observable
  networkFee = 0;

  @computed
  get lastBlockHeight() {
    if (this.basicInfo) {
      return this.basicInfo.chain.height;
    }

    return 0;
  }

  @action.bound
  async loadFee(): Promise<number> {
    const response = await axios.get(
      'https://bitcoiner.live/api/fees/estimates/latest',
    );
    const fee = response.data.estimates[30].total.p2pkh.satoshi;
    return Math.round(fee);
  }

  @action.bound
  public async loadBasicInfo() {
    const [basicInfo, fee, networkFee] = await Promise.all([
      btcNodeClient.loadBasicInfo(),
      btcNodeClient.loadFee(),
      this.loadFee(),
    ]);

    this.fee = fee;
    this.basicInfo = basicInfo;
    this.networkFee = networkFee;
  }
}
