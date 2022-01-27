import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { observable } from 'mobx';

export class AdminConfigForm extends StoreConstructor {
  @observable public bridgeEnable: boolean;
  @observable public whiteListAddresses: string;
}
