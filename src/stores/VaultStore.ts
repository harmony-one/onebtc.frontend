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
    if (!vaultId) {
      return null;
    }

    try {
      const vault = await dashboardClient.loadVault(vaultId);

      if (!vault) {
        return null;
      }

      this.entityMap[vaultId] = vault;

      await this.loadBalances(vaultId);

      return vault;
    } catch (err) {
      console.error('### err', err);
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

  static calcMaxLoanWei(onwWei: string) {
    const one = new BN(onwWei);
    return one.div(new BN(100)).mul(new BN(Math.ceil(100 / COLLATERAL_RATIO)));
  }

  static calcMaxLoanSat(oneWei: string, oneBtcRate: number) {
    return VaultStore.weiToSatoshi(
      VaultStore.calcMaxLoanWei(oneWei),
      oneBtcRate,
    );
  }

  static calcRequiredCollateral(sat: string | BN, oneBtcRate: number) {
    const requiredSat = new BN(sat)
      .div(new BN(100))
      .mul(new BN(COLLATERAL_RATIO * 100));
    return VaultStore.satoshiToWei(requiredSat, oneBtcRate);
  }

  static weiToSatoshi(wei: string | BN, oneBtcRate: number) {
    if (!oneBtcRate) {
      return new BN(0);
    }
    const satRate = new BN(oneBtcRate * 1e8);
    const oneToSatRate = new BN(utils.toWei('1')).div(satRate);
    return new BN(wei).div(oneToSatRate);
  }

  static satoshiToWei(sat: string | BN, oneBtcRate: number) {
    if (!oneBtcRate) {
      return new BN(0);
    }
    const satRate = new BN(oneBtcRate * 1e8);
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

  static isVaultHasCollateral(vault: IVault) {
    return parseInt(vault.collateral, 10) > 0;
  }

  static isVaultOnline(vault: IVault) {
    return vault.lastPing && Date.now() - vault.lastPing <= 5 * ONE_MINUTE;
  }

  static calcCollateral(collateralSat: number, volumeSat: number) {
    if (collateralSat === 0) {
      return 0;
    }
    return collateralSat / (volumeSat / 100);
  }

  static calcAvailableToIssueSat(vault: IVault, oneBtcRate: number) {
    const maxLoanSat = VaultStore.calcMaxLoanSat(vault.collateral, oneBtcRate);
    const currentLoanSat = VaultStore.calcCurrentLoan(vault);

    return BN.max(new BN(0), maxLoanSat.sub(currentLoanSat));
  }

  static calcAvailableToRedeemSat(vault: IVault, networkFee: number) {
    const availableBalanceSatBN = new BN(vault.issued).sub(
      new BN(vault.toBeRedeemed),
    );

    const networkFeeBN = new BN(networkFee);
    return availableBalanceSatBN.sub(networkFeeBN);
  }

  static calcAvailableToWithdrawWei(vault: IVault, oneBtcRate: number) {
    const currentLoanSat = VaultStore.calcCurrentLoan(vault);

    const requiredCollateralWei = VaultStore.calcRequiredCollateral(
      currentLoanSat,
      oneBtcRate,
    );

    return BN.max(
      new BN(vault.collateral).sub(requiredCollateralWei),
      new BN(0),
    );
  }

  static calcCurrentLoan(vault: IVault) {
    return new BN(vault.issued)
      .add(new BN(vault.toBeIssued))
      .add(new BN(vault.toBeRedeemed));
  }

  public getVaultInfo(vault: IVault) {
    const collateralSat = this.collateralOneToSat(vault.collateral);

    const toBeIssuedSat = Number(vault.toBeIssued);
    const toBeRedeemedSat = Number(vault.toBeRedeemed);
    const issuedSat = Number(vault.issued);
    const lockedSat = new BN(vault.issued).add(new BN(vault.toBeIssued));

    const oneBtcRate = this.stores.ratesStore.ONE_BTC;

    const availableToIssueSat = VaultStore.calcAvailableToIssueSat(
      vault,
      oneBtcRate,
    );

    const availableToRedeemSat = VaultStore.calcAvailableToRedeemSat(
      vault,
      this.stores.btcNodeStore.networkFee,
    );

    const availableToWithdrawWei = VaultStore.calcAvailableToWithdrawWei(
      vault,
      oneBtcRate,
    );

    const collateralIssued = VaultStore.calcCollateral(
      collateralSat,
      issuedSat + toBeIssuedSat,
    );

    const collateralTotal = VaultStore.calcCollateral(collateralSat, issuedSat);
    const isActive = VaultStore.isVaultOnline(vault);

    return {
      collateral: vault.collateral,
      issuedSat,
      toBeIssuedSat,
      toBeRedeemedSat,
      lockedSat,
      availableToIssueSat,
      availableToRedeemSat,
      availableToWithdrawWei,
      collateralIssued,
      collateralTotal,
      isActive,
    };
  }
}
