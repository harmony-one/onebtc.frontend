import { StoreConstructor } from './core/StoreConstructor';
import { action, get, observable } from 'mobx';
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

  @get
  public get vaultActiveList() {
    return this.getActiveVaultList(this.vaultList);
  }

  @get
  public isEnoughFunds = (
    vault: IVault,
    amountSat: number | string | BN,
    type: 'redeem' | 'issue' = 'issue',
  ) => {
    const amount = new BN(amountSat);
    const isIssue = type === 'issue';
    const vaultInfo = this.stores.vaultStore.getVaultInfo(vault);
    const collateral = isIssue ? vaultInfo.collateralTotal >= 150 : true;
    const founds = isIssue
      ? vaultInfo.availableToIssueSat.gte(amount)
      : vaultInfo.availableToRedeemSat.gte(amount);
    const isOnline = VaultStore.isVaultOnline(vault);

    const minIssueAmount =
      amount.eq(new BN(0)) ||
      !isIssue ||
        VaultStore.calcMinIssueAmountSat(vaultInfo.collateralSat).lte(amount);

    return isOnline && founds && collateral && minIssueAmount;
  };

  @get
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
