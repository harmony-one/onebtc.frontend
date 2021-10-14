import { action } from 'mobx';
import { btcRelayClient } from '../modules/btcRelay/btcRelayClient';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';

export class VaultStore extends EntityStore<IVault> {
  @action.bound
  public async loadVault(vaultId: string) {
    try {
      const vault = await btcRelayClient.loadVault(vaultId);

      if (!vault) {
        return null;
      }

      this.entityMap[vaultId] = vault;
      return vault;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }
}
