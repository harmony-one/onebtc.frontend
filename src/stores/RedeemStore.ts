import { action, get } from 'mobx';
import { btcRelayClient } from '../modules/btcRelay/btcRelayClient';
import { IRedeem } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { satoshiToBitcoin, walletHexToBech32 } from '../services/bitcoin';
import { config } from '../config';
import { RedeemStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';

export class RedeemStore extends EntityStore<IRedeem> {
  @action.bound
  public async loadRedeem(redeemId: string) {
    try {
      const issue = await btcRelayClient.loadRedeem(redeemId);

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

  @get
  public getRedeemInfo(redeemId: string) {
    const redeem = this.getEntity(redeemId);

    if (!redeem) {
      return null;
    }

    const sendAmount = satoshiToBitcoin(redeem.amountBtc);
    const totalReceived = satoshiToBitcoin(redeem.amountBtc);

    const isConfirmedBtcTX =
      redeem.btcTx &&
      redeem.btcTx.confirmations >= config.bitcoin.waitConfirmations;

    return {
      sendAmount,
      sendUsdAmount: sendAmount * this.stores.user.btcRate,
      redeemId: redeem.id,
      vaultId: redeem.vault,
      bitcoinAddress: walletHexToBech32(redeem.btcAddress),
      bridgeFee: satoshiToBitcoin(redeem.fee),
      totalReceived: totalReceived,
      totalReceivedUsd: totalReceived * this.stores.user.btcRate,
      rawRedeem: redeem,
      btcTx: redeem.btcTx,
      isConfirmedBtcTX,
      isPending: redeem.status === RedeemStatus.PENDING,
      isCompleted: redeem.status === RedeemStatus.COMPLETED,
    };
  }
}
