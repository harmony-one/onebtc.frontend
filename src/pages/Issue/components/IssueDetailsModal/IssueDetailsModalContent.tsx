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
  issueId: string;
}

export const IssueDetailsModalContent: React.FC<Props> = ({ issueId }) => {
  const { issuePageStore } = useStores();

  const issueInfo = issuePageStore.getIssueInfo(issueId);

  const btcTx = useBtcWalletVaultIncomeWatcher({
    issueId,
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
          <IssueDetailsModalTransaction issueId={issueId} />
        </Box>
        <Box basis="1/2">
          {!btcTx && <IssueDepositModalContent issueId={issueId} />}
          {btcTx && (
            <IssueDetailsModalConfirmation issueId={issueId} btcTx={btcTx} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

IssueDetailsModalContent.displayName = 'IssueDetailsModalContent';
