import { action, observable } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { ONE_MINUTE } from '../constants/date';
import utils from 'web3-utils';
import BN from 'bn.js';

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
      (Number(oneAmount) * 1e8 * this.stores.ratesStore.ONE_BTC) /
      COLLATERAL_RATIO
    );
  }

  public calcMaxLoanWei(onwWei: string) {
    const one = new BN(onwWei);
    return one.div(new BN(100)).mul(new BN(Math.ceil(100 / COLLATERAL_RATIO)));
  }

  public calcMaxLoanSat(oneWei: string) {
    return this.weiToSatoshi(this.calcMaxLoanWei(oneWei));
  }

  public calcRequiredCollateral(sat: string | BN) {
    const requiredSat = new BN(sat)
      .div(new BN(100))
      .mul(new BN(COLLATERAL_RATIO * 100));
    return this.satoshiToWei(requiredSat);
  }

  public weiToSatoshi(wei: string | BN) {
    if (!this.stores.ratesStore.ONE_BTC) {
      return new BN(0);
    }
    const satRate = new BN(this.stores.ratesStore.ONE_BTC * 1e8);
    const oneToSatRate = new BN(utils.toWei('1')).div(satRate);
    return new BN(wei).div(oneToSatRate);
  }

  public satoshiToWei(sat: string | BN) {
    if (!this.stores.ratesStore.ONE_BTC) {
      return new BN(0);
    }
    const satRate = new BN(this.stores.ratesStore.ONE_BTC * 1e8);
    const oneToSatRate = new BN(utils.toWei('1')).div(satRate);

    return new BN(sat).mul(oneToSatRate);
  }

  public collateralSatToOne(sat: number) {
    return (sat / 1e8 / this.stores.ratesStore.ONE_BTC) * COLLATERAL_RATIO;
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
    const lockedSat = new BN(vault.issued).add(new BN(vault.toBeIssued));

    const collateralRedeemed = collateralSat / (toBeRedeemedSat / 100);
    const collateralIssued = collateralSat / (toBeIssuedSat / 100);
    const collateralTotal =
      collateralSat / ((issuedSat + toBeIssuedSat + toBeRedeemedSat) / 100);

    const maxLoanSat = this.calcMaxLoanSat(vault.collateral);

    const currentLoanSat = new BN(issuedSat + toBeIssuedSat + toBeRedeemedSat);
    const availableSatToIssue = maxLoanSat.sub(currentLoanSat);

    const requiredCollateralWei = this.calcRequiredCollateral(currentLoanSat);
    const availableWeiToWithdraw = BN.max(
      new BN(vault.collateral).sub(requiredCollateralWei),
      new BN(0),
    );

    const oneAmount = Number(vault.collateral) / 1e18;
    const maxWithdraw = availableWeiToWithdraw;

    const availableAmountSat = availableSatToIssue;
    const availableBalanceSatBN = new BN(vault.issued).sub(
      new BN(vault.toBeRedeemed),
    );

    const networkFeeBN = new BN(this.stores.btcNodeStore.networkFee);
    const availableToRedeem = availableBalanceSatBN.sub(networkFeeBN);
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
      lockedSat,
      isActive,
      maxWithdraw,
    };
  }
}
