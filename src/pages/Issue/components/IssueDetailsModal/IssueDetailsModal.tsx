import React from 'react';
import { IssueDetailsModalContent } from './IssueDetailsModalContent';
import { TActionModalProps } from '../../../../components/ActionModals';
import { useStores } from '../../../../stores';
import { Spinner } from '../../../../ui';
import { Box } from 'grommet';
import { useIssueWatcher } from '../../../../hooks/useIssueWatcher';
import { Divider, Title } from 'components/Base';

export const IssueDetailsModal: React.FC<TActionModalProps> = props => {
  const { issueId } = props.actionData.data;
  const { issueStore } = useStores();
  const [stopWatcher, counter] = useIssueWatcher({ issueId });

  const issue = issueStore.getEntity(issueId);

  if (!issue && counter < 3) {
    return (
      <Box pad="medium" align="center" width="320px" gap="small">
        <Box>
          <Title>Loading...</Title>
        </Box>
        <Divider colorful fullwidth />
        <Box align="center">
          <Spinner />
        </Box>
      </Box>
    );
  }

  if (!issue && counter >= 3) {
    return (
      <Box pad="medium" align="center" width="320px" gap="small">
        <Box>
          <Title>Issue not found</Title>
        </Box>
      </Box>
    );
  }

  return <IssueDetailsModalContent issueId={issueId} />;
};

IssueDetailsModal.displayName = 'IssueDetailsModal';
