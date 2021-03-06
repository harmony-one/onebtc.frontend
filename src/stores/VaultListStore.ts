import { StoreConstructor } from './core/StoreConstructor';
import { action, observable } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IVault } from '../modules/dashboard/dashboardTypes';
import { randomInt } from '../utils';
import { VaultStore } from './VaultStore';
import BN from 'bn.js';
import logger from '../modules/logger';

const log = logger.module('VaultListStore');

export class VaultListStore extends StoreConstructor {
  @observable public vaultList: IVault[] = [];

  @observable public isLoading = false;

  @observable public issueFilter = { amount: new BN('0') };

  @action.bound
  public async loadVaults() {
    this.isLoading = true;
    try {
      const response = await dashboardClient.loadVaultList({
        size: 50,
        page: 0,
      });
      this.vaultList = response.content;
    } catch (error) {
      log.error('Error durilt load vaults', { error });
    }
    this.isLoading = false;
  }

  @action.bound
  updateIssueFilter(params: { amountSat: number | string }) {
    this.issueFilter = { amount: new BN(params.amountSat) };
  }

  getDefaultVaultId(vaultList: IVault[]) {
    if (vaultList.length === 0) {
      return null;
    }

    const max = vaultList.length - 1;
    const min = 0;
    const index = randomInt(min, max);

    return vaultList[index].id;
  }

  getActiveVaultList(vaultList: IVault[]) {
    return vaultList
      .filter(VaultStore.isVaultHasCollateral)
      .filter(VaultStore.isVaultOnline);
  }

  public get vaultActiveList() {
    return this.getActiveVaultList(this.vaultList);
  }

  public isEnoughFunds = (
    vault: IVault,
    amountSat: number | string | BN,
    type: 'redeem' | 'issue' = 'issue',
  ) => {
    const isOnline = VaultStore.isVaultOnline(vault);

    if (!isOnline) {
      return false;
    }

    const amount = new BN(amountSat);
    const vaultInfo = this.stores.vaultStore.getVaultInfo(vault);
    const isIssue = type === 'issue';

    const founds = isIssue
      ? vaultInfo.availableToIssueSat.gte(amount)
      : vaultInfo.availableToRedeemSat.gte(amount);

    if (!founds) {
      return false;
    }

    const collateral = isIssue ? vaultInfo.collateralTotal >= 150 : true;

    if (!collateral) {
      return false;
    }

    return true;
  };

  public get vaultRedeemList() {
    const oneBtcRate = this.stores.ratesStore.ONE_BTC;
    const hasToRedeem = (vault: IVault) =>
      VaultStore.calcAvailableToRedeemSat(vault, oneBtcRate).gt(new BN(0));
    return this.getActiveVaultList(this.vaultList).filter(hasToRedeem);
  }

  public getVault(vaultId: string) {
    return this.vaultList.find(vault => vault.id === vaultId);
  }
}
