import React from 'react';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { IssueTransactionDetails } from './IssueTransactionDetails';
import { DepositModalContent } from '../DepositModal';
import { IssueTransactionConfirmation } from './IssueTransactionConfirmation';
import { config } from '../../../../config';
import { useBtcWalletVaultIncomeWatcher } from '../../../../hooks/useBtcWalletVaultIncomeWatcher';

interface IssueTransactionModalContentProps {
  sendAmount: number;
  sendUsdAmount: number;
  bitcoinAddress: string;
  bridgeFee: number;
  issueId: string;
  totalReceived: number;
  totalReceivedUsd: number;
  vaultId: string;
  issueTxHash: string;
  requester: string;
}

export const IssueTransactionModalContent: React.FC<IssueTransactionModalContentProps> = props => {
  const {
    sendAmount,
    sendUsdAmount,
    bitcoinAddress,
    bridgeFee,
    issueId,
    totalReceived,
    totalReceivedUsd,
    vaultId,
    issueTxHash,
    requester,
  } = props;

  const btcTx = useBtcWalletVaultIncomeWatcher({
    bitcoinAddress,
    confirmations: config.bitcoin.waitConfirmations,
  });

  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Text style={{ overflowWrap: 'break-word', textAlign: 'center' }}>
        ISSUE # {issueId}
      </Text>
      <Divider fullwidth colorful />
      <Box direction="row-responsive" gap="medium" basis="full" align="start">
        <Box basis="1/2">
          <IssueTransactionDetails
            bitcoinAddress={bitcoinAddress}
            bridgeFee={bridgeFee}
            vaultId={vaultId}
            totalReceived={totalReceived}
            totalReceivedUsd={totalReceivedUsd}
            requester={requester}
          />
        </Box>
        <Box basis="1/2">
          {!btcTx && (
            <DepositModalContent
              sendAmount={sendAmount}
              sendUsdAmount={sendUsdAmount}
              bitcoinAddress={bitcoinAddress}
            />
          )}
          {btcTx && (
            <IssueTransactionConfirmation
              issueTxHash={issueTxHash}
              btcTx={btcTx}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

IssueTransactionModalContent.displayName = 'IssueTransactionModalContent';
