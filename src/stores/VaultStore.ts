import { action, observable } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { ONE_MINUTE } from '../constants/date';
import utils from 'web3-utils';
import BN from 'bn.js';

export const vaultBalancesStore = observable({});

const COLLATERAL_RATIO = 1.5;

export interface VaultInfo {
  id: string;
  collateral: string;
  issuedSat: number;
  toBeIssuedSat: number;
  toBeRedeemedSat: number;
  lockedSat: BN;
  availableToIssueSat: BN;
  availableToRedeemSat: BN;
  availableToWithdrawWei: BN;
  collateralIssued: number;
  collateralTotal: number;
  collateralSat: number;
  isActive: boolean;
}

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

  @action.bound
  public updateVault(vault: IVault) {
    this.entityMap[vault.id] = vault;
  }

  public async loadBalances(vaultId: string) {
    const result = await dashboardClient.loadVaultBalances(vaultId);

    vaultBalancesStore[vaultId] = result.content.reduce((acc, item) => {
      return Number(item.amount) + acc;
    }, 0);
  }

  public collateralOneToSat(oneWei: string, oneBtcRate: number) {
    const oneAmount = utils.fromWei(oneWei || '0');
    return Number(oneAmount) * 1e8 * oneBtcRate;
  }

  static calcMaxLoanWei(onwWei: string) {
    const one = new BN(onwWei || '0');

    return one.div(new BN(150)).mul(new BN(100));
  }

  static calcMaxLoanSat(oneWei: string, oneBtcRate: number) {
    return VaultStore.weiToSatoshi(
      VaultStore.calcMaxLoanWei(oneWei || '0'),
      oneBtcRate,
    );
  }

  static calcRequiredCollateral(sat: string | BN, oneBtcRate: number) {
    const requiredSat = new BN(sat || '0')
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
    return new BN(wei || '0').div(oneToSatRate);
  }

  static satoshiToWei(sat: string | BN, oneBtcRate: number) {
    if (!oneBtcRate) {
      return new BN(0);
    }
    const satRate = new BN(oneBtcRate * 1e8);
    const oneToSatRate = new BN(utils.toWei('1')).div(satRate);

    return new BN(sat || '0').mul(oneToSatRate);
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
      .toBN(vault.collateral || '0')
      .add(utils.toBN(amountOne || '0').mul(utils.toBN(m)));

    return this.getVaultInfo({
      ...vault,
      collateral: newCollateral.toString(),
    });
  }

  static isVaultHasCollateral(vault: IVault) {
    return parseInt(vault.collateral || '0', 10) > 0;
  }

  static isVaultOnline(vault: IVault) {
    return vault.lastPing
      ? Date.now() - vault.lastPing <= 5 * ONE_MINUTE
      : false;
  }

  static calcCollateral(collateralSat: number, volumeSat: number) {
    if (collateralSat === 0) {
      return 0;
    }
    return (collateralSat / Math.max(volumeSat, 0)) * 100;
  }

  static calcSecurityDeposit(collateral: number) {
    return (collateral * 5) / 100000;
  }

  static calcNewCollateralization(
    vaultInfo: VaultInfo,
    amountSat: string | number | BN,
  ) {
    const issuedSat = new BN(vaultInfo.issuedSat);
    const toBeIssued = new BN(vaultInfo.toBeIssuedSat);
    const amount = new BN(amountSat);

    const totalAmount = issuedSat.add(toBeIssued).add(amount);

    return VaultStore.calcCollateral(
      vaultInfo.collateralSat,
      totalAmount.toNumber(),
    );
  }

  static calcAvailableToIssueSat(vault: IVault, oneBtcRate: number) {
    const maxLoanSat = VaultStore.calcMaxLoanSat(
      vault.collateral || '0',
      oneBtcRate,
    );
    const currentLoanSat = VaultStore.calcCurrentLoan(vault);

    return BN.max(new BN(0), maxLoanSat.sub(currentLoanSat));
  }

  static calcAvailableToRedeemSat(vault: IVault, networkFee: number) {
    const availableBalanceSatBN = new BN(vault.issued || '0').sub(
      new BN(vault.toBeRedeemed || '0'),
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
      new BN(vault.collateral || '0').sub(requiredCollateralWei),
      new BN(0),
    );
  }

  static calcCurrentLoan(vault: IVault) {
    return new BN(vault.issued || '0').add(new BN(vault.toBeIssued || '0'));
  }

  public getVaultInfo(vault: IVault): VaultInfo {
    const oneBtcRate = this.stores.ratesStore.ONE_BTC;

    const collateralSat = this.collateralOneToSat(vault.collateral, oneBtcRate);

    const toBeIssuedSat = Number(vault.toBeIssued || '0');
    const toBeRedeemedSat = Number(vault.toBeRedeemed || '0');
    const issuedSat = Number(vault.issued || '0');
    const lockedSat = new BN(issuedSat).add(new BN(toBeIssuedSat));

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
      issuedSat,
    );

    const collateralTotal = VaultStore.calcCollateral(
      collateralSat,
      issuedSat + toBeIssuedSat,
    );
    const isActive = VaultStore.isVaultOnline(vault);

    return {
      id: vault.id,
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
      collateralSat,
      isActive,
    };
  }
}
