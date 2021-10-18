import { IVault } from './btcRelayTypes';
import { ONE_MINUTE } from '../../constants/date';
import utils from 'web3-utils';
import { satoshiToBitcoin } from '../../services/bitcoin';

const COLLATERAL_RATIO = 1.5;

export function calcNewVaultCollateral(
  vault: IVault,
  amountOne: string,
  m: 1 | -1 = 1,
) {
  const newCollateral = utils
    .toBN(vault.collateral)
    .add(utils.toBN(amountOne).mul(utils.toBN(m)));

  return getVaultInfo({ ...vault, collateral: newCollateral.toString() });
}

function collateralOneToSat(oneWei: string) {
  const oneAmount = utils.fromWei(oneWei);
  return (Number(oneAmount) * 1e8) / COLLATERAL_RATIO; // TODO: 1 ONE !== 1 BTC
}

function collateralSatToOne(sat: number) {
  const oneAmount = satoshiToBitcoin(sat);
  return oneAmount * COLLATERAL_RATIO; // TODO: 1 ONE !== 1 BTC
}

export function getVaultInfo(vault: IVault) {
  const collateralSat = collateralOneToSat(vault.collateral);
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
        collateralSatToOne(issuedSat + toBeIssuedSat + toBeRedeemedSat) * 1.5,
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
