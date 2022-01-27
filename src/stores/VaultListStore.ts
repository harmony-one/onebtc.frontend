import { StoreConstructor } from './core/StoreConstructor';
import { action, get, observable } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IVault } from '../modules/dashboard/dashboardTypes';
import { randomInt } from '../utils';
import { VaultStore } from './VaultStore';
import BN from 'bn.js';

export class VaultListStore extends StoreConstructor {
  @observable private _vaultList: IVault[] = [];

  @action.bound
  public async loadVaults() {
    const response = await dashboardClient.loadVaultList({ size: 50, page: 0 });
    this._vaultList = response.content;
  }

  getDefaultVaultId(vaultList: IVault[]) {
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
    return this.getActiveVaultList(this._vaultList);
  }

  @get
  public get vaultRedeemList() {
    const oneBtcRate = this.stores.ratesStore.ONE_BTC;
    const hasToRedeem = (vault: IVault) =>
      VaultStore.calcAvailableToRedeemSat(vault, oneBtcRate).gt(new BN(0));
    return this.getActiveVaultList(this._vaultList).filter(hasToRedeem);
  }

  public getVault(vaultId: string) {
    return this._vaultList.find(vault => vault.id === vaultId);
  }
}
