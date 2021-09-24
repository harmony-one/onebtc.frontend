import React from 'react';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { IssueDetailsModalTransaction } from './IssueDetailsModalTransaction';
import { IssueDetailsModalConfirmation } from './IssueDetailsModalConfirmation';
import { config } from '../../../../config';
import { useBtcWalletVaultIncomeWatcher } from '../../../../hooks/useBtcWalletVaultIncomeWatcher';
import { IssueDepositModalContent } from '../IssueDepositModal/IssueDepositModalContent';
import { useStores } from '../../../../stores';

interface Props {
  issueTxHash: string;
}

export const IssueDetailsModalContent: React.FC<Props> = ({ issueTxHash }) => {
  const { issuePageStore } = useStores();

  const issueInfo = issuePageStore.getIssueInfo(issueTxHash);

  const btcTx = useBtcWalletVaultIncomeWatcher({
    bitcoinAddress: issueInfo.bitcoinAddress,
    confirmations: config.bitcoin.waitConfirmations,
  });

  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Text style={{ overflowWrap: 'break-word', textAlign: 'center' }}>
        ISSUE # {issueInfo.issueId}
      </Text>
      <Divider fullwidth colorful />
      <Box direction="row-responsive" gap="medium" basis="full" align="start">
        <Box basis="1/2">
          <IssueDetailsModalTransaction issueTxHash={issueTxHash} />
        </Box>
        <Box basis="1/2">
          {!btcTx && <IssueDepositModalContent issueTxHash={issueTxHash} />}
          {btcTx && (
            <IssueDetailsModalConfirmation
              issueTxHash={issueTxHash}
              btcTx={btcTx}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

IssueDetailsModalContent.displayName = 'IssueDetailsModalContent';
