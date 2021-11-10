import { action, get } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IIssue } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { btcAddressHexToBech32, satoshiToBitcoin } from '../services/bitcoin';
import { toBN } from 'web3-utils';
import { IssueStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';
import { config } from '../config';

export class IssueStore extends EntityStore<IIssue> {
  @action.bound
  public async loadIssue(issueId: string) {
    try {
      const issue = await dashboardClient.loadIssue(issueId);

      if (!issue) {
        return null;
      }

      this.entityMap[issueId] = issue;
      return issue;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }

  @get
  public getIssueInfo(issueId: string) {
    const issue = this.getEntity(issueId);

    if (!issue) {
      return null;
    }

    const btcRate = this.stores.ratesStore.BTC_USDT;
    const amount = satoshiToBitcoin(issue.amount);
    const sendAmount = satoshiToBitcoin(
      toBN(issue.amount)
        .add(toBN(issue.fee))
        .toNumber(),
    );
    const sendUsdAmount = sendAmount * btcRate;
    const bridgeFee = satoshiToBitcoin(issue.fee);
    const totalReceived = amount;
    const totalReceivedUsd = totalReceived * btcRate;

    const isConfirmedBtcTX =
      issue.btcTx &&
      issue.btcTx.confirmations >= config.bitcoin.waitConfirmations;

    const openTime = Number(issue.opentime) * 1000;
    const period = Number(issue.period) * 1000;
    const expiredTime = openTime + period;

    return {
      openTime,
      expiredTime,
      isExpired: Date.now() - expiredTime >= 0,
      isCanceled: issue.status === IssueStatus.CANCELED,
      rawIssue: issue,
      amount: amount,
      issueId: issue.id,
      vaultId: issue.vault,
      requester: issue.requester,
      bitcoinAddress: btcAddressHexToBech32(issue.btcAddress),
      sendAmount,
      sendUsdAmount,
      bridgeFee,
      totalReceived,
      totalReceivedUsd,
      btcTx: issue.btcTx,
      isConfirmedBtcTX,
      isPending: issue.status === IssueStatus.PENDING,
      isCompleted: issue.status === IssueStatus.COMPLETED,
    };
  }
}
