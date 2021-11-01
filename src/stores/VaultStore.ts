import { action, observable } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';

export const vaultBalancesStore = observable({});

export class VaultStore extends EntityStore<IVault> {
  @action.bound
  public async loadVault(vaultId: string) {
    try {
      const vault = await dashboardClient.loadVault(vaultId);

      if (!vault) {
        return null;
      }

      this.entityMap[vaultId] = vault;

      await this.loadBalances(vaultId);

      return vault;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }

  public async loadBalances(vaultId: string) {
    const result = await dashboardClient.loadVaultBalances(vaultId);

    vaultBalancesStore[vaultId] = result.content.reduce((acc, item) => {
      return Number(item.amount) + acc;
    }, 0);
  }
}
