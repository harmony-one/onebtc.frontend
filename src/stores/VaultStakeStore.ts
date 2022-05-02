import { action } from 'mobx';
import { EntityStore } from './core/EntityStore';
import { getOneBTCClient } from '../services/oneBtcClient';

export interface StakeInfo {
  lockPeriod: string;
  lockStartAt: string;
  lockExpireAt: string;
  collateralDebt: string;
  accClaimableRewards: string;
}

export class VaultStakeStore extends EntityStore<StakeInfo> {
  @action.bound
  public async loadVault(vaultId: string) {
    if (!vaultId) {
      return null;
    }

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);
      const vaultStakeInfo = await hmyClient.lockedVaults(vaultId);

      if (!vaultStakeInfo) {
        return null;
      }

      this.entityMap[vaultId] = vaultStakeInfo;
    } catch (err) {
      console.error('### err', err);
      return null;
    }
  }
}
