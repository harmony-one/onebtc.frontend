import { action, get } from 'mobx';
import { dashboardClient } from '../modules/dashboard/dashboardClient';
import { IIssue } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { btcAddressHexToBech32, satoshiToBitcoin } from '../services/bitcoin';
import { toBN } from 'web3-utils';
import { IssueStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';
import { config } from '../config';

export enum IssueExtendedStatus {
  UNEXPECTED = 'UNEXPECTED',
  WAIT_BTC_TRANSACTION = 'wait_btc_transaction',
  WAIT_BTC_CONFIRMATION = 'wait_btc_confirmation',
  WAIT_EXECUTE = 'wait_execute',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
}

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
  getIssueExtendeStatus(issueId: string): IssueExtendedStatus {
    const issue = this.getEntity(issueId);

    if (!issue) {
      return null;
    }

    if (issue.status === IssueStatus.COMPLETED) {
      return IssueExtendedStatus.COMPLETED;
    }

    if (issue.status === IssueStatus.CANCELED) {
      return IssueExtendedStatus.CANCELED;
    }

    const isPending = issue.status === IssueStatus.PENDING;
    const hasBtcTx = !!issue.btcTx;

    if (isPending && !hasBtcTx) {
      return IssueExtendedStatus.WAIT_BTC_TRANSACTION;
    }

    if (isPending && hasBtcTx) {
      const isBtcTxConfirmed =
        issue.btcTx &&
        issue.btcTx.confirmations >= config.bitcoin.waitConfirmationsCount;

      return isBtcTxConfirmed
        ? IssueExtendedStatus.WAIT_EXECUTE
        : IssueExtendedStatus.WAIT_BTC_CONFIRMATION;
    }

    return IssueExtendedStatus.UNEXPECTED;
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
      issue.btcTx.confirmations >= config.bitcoin.waitConfirmationsCount;

    const openTime = Number(issue.opentime) * 1000;
    const period = Number(issue.period) * 1000;
    const expiredTime = openTime + period;

    return {
      openTime,
      expiredTime,
      isExpired: Date.now() - expiredTime >= 0,
      isCanceled: issue.status === IssueStatus.CANCELED,
      extendedStatus: this.getIssueExtendeStatus(issueId),
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
