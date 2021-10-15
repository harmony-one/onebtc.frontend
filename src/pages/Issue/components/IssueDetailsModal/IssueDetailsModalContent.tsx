import React from 'react';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { IssueDetailsModalTransaction } from './IssueDetailsModalTransaction';
import { IssueDetailsModalConfirmation } from './IssueDetailsModalConfirmation';
import { IssueDepositModalContent } from '../IssueDepositModal/IssueDepositModalContent';
import { useStores } from '../../../../stores';
import { useIssueWatcher } from '../../../../hooks/useIssueWatcher';

interface Props {
  issueId: string;
}

export const IssueDetailsModalContent: React.FC<Props> = ({ issueId }) => {
  const { issueStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  useIssueWatcher({ issueId });

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
          {!issueInfo.isCompleted && !issueInfo.btcTx && (
            <IssueDepositModalContent issueId={issueId} />
          )}
          {issueInfo.btcTx && (
            <IssueDetailsModalConfirmation issueId={issueId} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

IssueDetailsModalContent.displayName = 'IssueDetailsModalContent';
