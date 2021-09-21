import React from 'react';
import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { IssueTransactionModalContent } from './IssueTransactionModalContent';
import { TActionModalProps } from '../../../../components/ActionModals';

export const IssueTransactionModal: React.FC<TActionModalProps> = props => {
  const { transactionHash } = props.actionData.data;
  const { issuePageStore, user } = useStores();
  const issue = issuePageStore.issuesMap[transactionHash];

  const sendAmount = Number(issue.issueAmount) / 1e9;
  const sendUsdAmount = sendAmount * user.btcRate;
  const issueId = issue.issueEvent.issue_id;
  const vaultId = issue.issueEvent.vault_id;
  const bitcoinAddress = issue.btcAddress;
  const bridgeFee = Number(issue.issueEvent.fee) / 1e9;
  const totalReceived = Number(issue.issueEvent.amount) / 1e9;
  const totalReceivedUsd = totalReceived * user.btcRate;

  return useObserver(() => (
    <IssueTransactionModalContent
      bitcoinAddress={bitcoinAddress}
      sendAmount={sendAmount}
      sendUsdAmount={sendUsdAmount}
      bridgeFee={bridgeFee}
      issueId={issueId}
      vaultId={vaultId}
      totalReceived={totalReceived}
      totalReceivedUsd={totalReceivedUsd}
      issueTxHash={transactionHash}
    />
  ));
};

IssueTransactionModal.displayName = 'IssueTransactionModal';
