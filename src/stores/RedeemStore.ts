import { action } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IRedeem } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { satoshiToBitcoin, btcAddressHexToBech32 } from '../services/bitcoin';
import { config } from '../config';
import { RedeemStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';

export enum RedeemExtendedStatus {
  UNEXPECTED = 'UNEXPECTED',
  WAIT_BTC_TRANSACTION = 'wait_btc_transaction',
  WAIT_BTC_CONFIRMATION = 'wait_btc_confirmation',
  WAIT_EXECUTE = 'wait_execute',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

export class RedeemStore extends EntityStore<IRedeem> {
  @action.bound
  public async loadRedeem(redeemId: string) {
    try {
      const issue = await dashboardClient.loadRedeem(redeemId);

      if (!issue) {
        return null;
      }

      this.entityMap[redeemId] = issue;
      return issue;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }

  public getRedeemInfo(redeemId: string) {
    const redeem = this.getEntity(redeemId);

    if (!redeem) {
      return null;
    }

    const sendAmount = satoshiToBitcoin(redeem.amountBtc);
    const totalReceived = satoshiToBitcoin(redeem.amountBtc);

    const isConfirmedBtcTX =
      redeem.btcTx &&
      redeem.btcTx.confirmations >= config.bitcoin.waitConfirmationsCount;

    const openTime = Number(redeem.opentime) * 1000;
    const period = Number(redeem.period) * 1000;
    const expiredTime = openTime + period;

    return {
      sendAmount,
      expiredTime,
      isExpired: Date.now() - expiredTime >= 0,
      requester: redeem.requester,
      sendUsdAmount: sendAmount * this.stores.ratesStore.BTC_USDT,
      redeemId: redeem.id,
      vaultId: redeem.vault,
      bitcoinAddress: btcAddressHexToBech32(redeem.btcAddress),
      bridgeFee: satoshiToBitcoin(redeem.fee),
      // @ts-expect-error transferFeeBtc
      transferFeeBtc: satoshiToBitcoin(redeem.transferFeeBtc),
      totalReceived: totalReceived,
      totalReceivedUsd: totalReceived * this.stores.ratesStore.BTC_USDT,
      rawRedeem: redeem,
      btcTx: redeem.btcTx,
      isConfirmedBtcTX,
      isPending: redeem.status === RedeemStatus.PENDING,
      isCompleted: redeem.status === RedeemStatus.COMPLETED,
      isCanceled: redeem.status === RedeemStatus.CANCELED,
      extendedStatus: this.getRedeemExtendedStatus(redeem),
    };
  }

  getRedeemExtendedStatus(redeem: IRedeem): RedeemExtendedStatus {
    if (redeem.status === RedeemStatus.COMPLETED) {
      return RedeemExtendedStatus.COMPLETED;
    }

    if (redeem.status === RedeemStatus.CANCELED) {
      return RedeemExtendedStatus.CANCELED;
    }

    const isPending = redeem.status === RedeemStatus.PENDING;
    const hasBtcTx = !!redeem.btcTx;

    if (isPending && !hasBtcTx) {
      return RedeemExtendedStatus.WAIT_BTC_TRANSACTION;
    }

    if (isPending && hasBtcTx) {
      const isBtcTxConfirmed =
        redeem.btcTx &&
        redeem.btcTx.confirmations >= config.bitcoin.waitConfirmationsCount;

      return isBtcTxConfirmed
        ? RedeemExtendedStatus.WAIT_EXECUTE
        : RedeemExtendedStatus.WAIT_BTC_CONFIRMATION;
    }

    return RedeemExtendedStatus.UNEXPECTED;
  }
}
