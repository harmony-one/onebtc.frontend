import React from 'react';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { IssueDetailsModalTransaction } from './IssueDetailsModalTransaction';
import { IssueDepositModalContent } from '../IssueDepositModal/IssueDepositModalContent';
import { useStores } from '../../../../stores';
import { useIssueWatcher } from '../../../../hooks/useIssueWatcher';
import { IssueDetailsModalCanceled } from './IssueDetailsModalCanceled';
import { IssueExtendedStatus } from '../../../../stores/IssueStore';
import { IssueDetailsModalCompleted } from './IssueDetailsModalCompleted';
import { IssueDetailsModalWaitBtcTxConfirmation } from './IssueDetailsModalWaitBtcTxConfirmation';
import { IssueDetailsModalWaitExecute } from './IssueDetailsModalWaitExecute';

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
        <Box basis="1/2" alignSelf="stretch">
          <IssueDetailsModalTransaction issueId={issueId} />
        </Box>
        <Box basis="1/2">
          {issueInfo.extendedStatus === IssueExtendedStatus.CANCELED && (
            <IssueDetailsModalCanceled issueId={issueId} />
          )}
          {issueInfo.extendedStatus ===
            IssueExtendedStatus.WAIT_BTC_TRANSACTION && (
            <IssueDepositModalContent issueId={issueId} />
          )}
          {issueInfo.extendedStatus === IssueExtendedStatus.COMPLETED && (
            <IssueDetailsModalCompleted issueId={issueId} />
          )}
          {issueInfo.extendedStatus ===
            IssueExtendedStatus.WAIT_BTC_CONFIRMATION && (
            <IssueDetailsModalWaitBtcTxConfirmation issueId={issueId} />
          )}
          {issueInfo.extendedStatus === IssueExtendedStatus.WAIT_EXECUTE && (
            <IssueDetailsModalWaitExecute issueId={issueId} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

IssueDetailsModalContent.displayName = 'IssueDetailsModalContent';
