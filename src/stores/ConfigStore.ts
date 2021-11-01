import { StoreConstructor } from './core/StoreConstructor';
import { ConfigType, getConfig } from '../config';
import axios from 'axios';
import { action } from 'mobx';

export class ConfigStore extends StoreConstructor {
  private _configType = ConfigType.TESTNET;
  private _netConfig = null;

  @action.bound
  async loadConfig() {
    const config = getConfig(this._configType);

    const response = await axios.get(`${config.harmony.dashboardHost}/monitor`);

    console.log('### res', response);
    const { data } = response;
    this._netConfig = {
      hmyNodeUrl: data.relayerClient.hmyNodeUrl,
      btcNodeUrl: data.relayerClient.btcNodeUrl,
      oneBtcContract: data.mainEvents.contractAddress,
    };

    console.log('### this._netConfig', this._netConfig);
  }
}
