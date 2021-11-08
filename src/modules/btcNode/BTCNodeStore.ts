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
    const response = await axios.get('https://api.blockcypher.com/v1/btc/main');
    return response.data.medium_fee_per_kb / 2;
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
