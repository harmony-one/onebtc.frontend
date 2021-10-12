import * as React from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import * as styles from './IssuePageStyles.styl';
import { IssueForm } from './components/IssueForm/IssueForm';
import { NavigateTabs } from '../../components/NavigateTabs';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useStores } from '../../stores';

export const IssuePage = () => {
  const { issueId, modal } = useParams<{ issueId?: string; modal: string }>();
  const { issuePageStore } = useStores();

  useEffect(() => {
    issuePageStore.loadVaults();
  }, [issuePageStore]);

  useEffect(() => {
    if (issueId) {
      if (modal === 'deposit') {
        issuePageStore.openDepositModal(issueId);
        return;
      } else {
        issuePageStore.openIssueDetailsModal(issueId);
      }
    }
  }, [issuePageStore, issueId, modal]);

  return (
    <BaseContainer>
      <PageContainer>
        <Box align="center" margin={{ top: 'large', bottom: 'large' }}>
          <Box align="center" className={styles.contentContainer}>
            <NavigateTabs />

            <Box
              direction="column"
              align="center"
              justify="center"
              fill={true}
              pad="medium"
              className={styles.issueContainer}
            >
              <IssueForm />
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
