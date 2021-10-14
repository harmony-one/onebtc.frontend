import { action, get } from 'mobx';
import { btcRelayClient } from '../modules/btcRelay/btcRelayClient';
import { IIssue } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { EntityStore } from './core/EntityStore';
import { satoshiToBitcoin, walletHexToBech32 } from '../services/bitcoin';
import { toBN } from 'web3-utils';
import { IssueStatus } from '../../../onebtc.sdk.fork/lib/blockchain/hmy/types';
import { config } from '../config';

export class IssueStore extends EntityStore<IIssue> {
  @action.bound
  public async loadIssue(issueId: string) {
    try {
      const issue = await btcRelayClient.loadIssue(issueId);

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
  public getIssueInfo(issue: IIssue) {
    if (!issue) {
      return null;
    }

    const btcRate = this.stores.user.btcRate;
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

    return {
      rawIssue: issue,
      amount: amount,
      issueId: issue.id,
      vaultId: issue.vault,
      requester: issue.requester,
      bitcoinAddress: walletHexToBech32(issue.btcAddress),
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
