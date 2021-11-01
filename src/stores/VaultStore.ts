import { action, observable } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { ONE_MINUTE } from '../constants/date';
import utils from 'web3-utils';

export const vaultBalancesStore = observable({});

const COLLATERAL_RATIO = 1.5;

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

  public collateralOneToSat(oneWei: string) {
    const oneAmount = utils.fromWei(oneWei);
    return (
      (Number(oneAmount) * 1e8 * this.stores.user.oneBtcRate) / COLLATERAL_RATIO
    );
  }

  public collateralSatToOne(sat: number) {
    return sat / this.stores.user.oneBtcRate / COLLATERAL_RATIO;
  }

  public calcNewVaultCollateral(
    vault: IVault,
    amountOne: string,
    m: 1 | -1 = 1,
  ) {
    const newCollateral = utils
      .toBN(vault.collateral)
      .add(utils.toBN(amountOne).mul(utils.toBN(m)));

    return this.getVaultInfo({
      ...vault,
      collateral: newCollateral.toString(),
    });
  }

  public getVaultInfo(vault: IVault) {
    const collateralSat = this.collateralOneToSat(vault.collateral);
    const toBeIssuedSat = Number(vault.toBeIssued);
    const toBeRedeemedSat = Number(vault.toBeRedeemed);
    const issuedSat = Number(vault.issued);
    const collateralRedeemed = collateralSat / (toBeRedeemedSat / 100);
    const collateralIssued = collateralSat / (toBeIssuedSat / 100);
    const collateralTotal =
      collateralSat / ((issuedSat + toBeIssuedSat + toBeRedeemedSat) / 100);

    const oneAmount = Number(vault.collateral) / 1e18;
    const maxWithdraw =
      Math.max(
        oneAmount -
          this.collateralSatToOne(issuedSat + toBeIssuedSat + toBeRedeemedSat),
        0,
      ) * 1e18;

    const availableAmountSat = collateralSat - toBeRedeemedSat - toBeIssuedSat;
    const availableToRedeem = issuedSat;
    const isActive =
      vault.lastPing && Date.now() - vault.lastPing <= 5 * ONE_MINUTE;

    return {
      oneAmount,
      availableAmountSat,
      availableToRedeem,
      toBeIssuedSat,
      toBeRedeemedSat,
      collateralRedeemed,
      collateralIssued,
      collateralTotal,
      issuedSat,
      isActive,
      maxWithdraw,
    };
  }
}
