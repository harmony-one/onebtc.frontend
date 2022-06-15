import * as React from 'react';
import { Box } from 'grommet';
import { IssueForm } from './components/IssueForm/IssueForm';
import { NavigateTabs } from '../../components/NavigateTabs';
import { useParams } from 'react-router';
import { useCallback, useEffect } from 'react';
import { useStores } from '../../stores';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { useInterval } from '../../hooks/useInterval';
import { ONE_SECOND } from '../../constants/date';
import { BridgeContentContainer } from 'components/BridgeContentContainer';
import { BridgeFormsSurface } from '../../components/BridgeFormsSurface';

export const IssuePage = () => {
  const { issueId, modal } = useParams<{ issueId?: string; modal: string }>();
  const { issuePageStore } = useStores();

  const updateVaults = useCallback(() => {
    issuePageStore.updateVaults();
  }, [issuePageStore]);

  useEffect(() => {
    issuePageStore.initPage();
  }, [issuePageStore]);

  useInterval({
    callback: updateVaults,
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
        <BridgeContentContainer>
          <NavigateTabs />

          <BridgeFormsSurface>
            <IssueForm />
          </BridgeFormsSurface>
        </BridgeContentContainer>
      </Box>
    </BaseLayout>
  );
};
