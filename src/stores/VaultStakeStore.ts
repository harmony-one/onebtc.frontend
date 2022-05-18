import { action } from 'mobx';
import { EntityStore } from './core/EntityStore';
import { getOneBTCClient } from '../services/oneBtcClient';

export interface StakeInfo {
  lockPeriod: number;
  lockStartAt: number;
  lockExpireAt: number;
  collateralDebt: string;
  accClaimableRewards: string;
  rewardClaimAt: number;
}

export interface OriginalStakeInfo {
  lockPeriod: string;
  lockStartAt: string;
  lockExpireAt: string;
  collateralDebt: string;
  accClaimableRewards: string;
  rewardClaimAt: string;
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

      this.entityMap[vaultId] = this.parseStakeInfo(vaultStakeInfo);
    } catch (err) {
      console.error('### err', err);
      return null;
    }
  }

  private parseStakeInfo(info: OriginalStakeInfo): StakeInfo {
    return {
      lockPeriod: Number(info.lockPeriod),
      lockStartAt: Number(info.lockStartAt) * 1000,
      lockExpireAt: Number(info.lockExpireAt) * 1000,
      collateralDebt: info.collateralDebt,
      accClaimableRewards: info.accClaimableRewards,
      rewardClaimAt: Number(info.rewardClaimAt) * 1000,
    };
  }
}
