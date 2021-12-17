import * as React from 'react';
import { Box } from 'grommet';
import * as styles from './IssuePageStyles.styl';
import { IssueForm } from './components/IssueForm/IssueForm';
import { NavigateTabs } from '../../components/NavigateTabs';
import { useParams } from 'react-router';
import { useCallback, useEffect } from 'react';
import { useStores } from '../../stores';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { useInterval } from '../../hooks/useInterval';
import { ONE_SECOND } from '../../constants/date';

export const IssuePage = () => {
  const { issueId, modal } = useParams<{ issueId?: string; modal: string }>();
  const { issuePageStore } = useStores();

  const loadVaults = useCallback(() => {
    issuePageStore.loadVaults();
  }, [issuePageStore]);

  useInterval({
    callback: loadVaults,
    timeout: ONE_SECOND * 10,
  });

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
    <BaseLayout>
      <Box align="center">
        <Box align="center" className={styles.contentContainer}>
          <NavigateTabs />

          <Box
            direction="column"
            align="center"
            justify="center"
            fill="horizontal"
            pad="medium"
            className={styles.issueContainer}
          >
            <IssueForm />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};
