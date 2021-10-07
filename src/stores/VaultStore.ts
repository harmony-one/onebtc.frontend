import { StoreConstructor } from './core/StoreConstructor';
import { action, observable } from 'mobx';
import { IVault } from '../modules/btcRelay/btcRelayTypes';
import BtcRelayClient from '../modules/btcRelay/btcRelayClient';

export class VaultStore extends StoreConstructor {
  @observable
  public vaultMap: Record<string, IVault> = {};

  @action.bound
  public async loadVault(vaultId: string) {
    try {
      const vault = await BtcRelayClient.loadVault(vaultId);

      if (!vault) {
        return null;
      }

      this.vaultMap[vaultId] = vault;
      return vault;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }
}
