import { StoreConstructor } from './core/StoreConstructor';
import { action, observable } from 'mobx';
import { btcRelayClient } from '../modules/btcRelay/btcRelayClient';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';

export class VaultStore extends StoreConstructor {
  @observable
  public vaultMap: Record<string, IVault> = {};

  @action.bound
  public async loadVault(vaultId: string) {
    try {
      const vault = await btcRelayClient.loadVault(vaultId);

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
