import React, { useCallback } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { DashboardCardBtcRelay } from '../../components/Dashboard/DashboardCardBtcRelay';
import { DashboardIssueCard } from './components/DashboardIssueCard';
import { DashboardCapacityCard } from './components/DashboardCapacityCard';
import { DashboardTVLCard } from './components/DashboardTVLCard';
import { dashboardHistoryStore } from './DashboardHistoryStore';
import { DashboardVaultActivityCard } from './components/DashboardVaultActivityCard';
import { DashboardVaults } from './components/DashboardVaults';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { useInterval } from '../../hooks/useInterval';
import { ONE_SECOND } from '../../constants/date';
import { DashboardIssuedDaily } from './components/DashboardIssuedDaily';
import { DashboardRedeemedDaily } from './components/DashboardRedeemedDaily';

type Props = {};

export const DashboardPage: React.FC<Props> = observer(() => {
  const loadData = useCallback(() => {
    dashboardHistoryStore.loadData();
  }, []);

  useInterval({
    callback: loadData,
    timeout: ONE_SECOND * 10,
  });

  return (
    <BaseLayout>
      <Box gap="medium">
        <Box>
          <Title align="center">Dashboard</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
        <Box justify="center" direction="row-responsive" wrap>
          <Box pad="xxsmall" align="center">
            <DashboardTVLCard />
          </Box>
          <Box pad="xxsmall" align="center">
            <DashboardCapacityCard />
          </Box>
          <Box pad="xxsmall" align="center">
            <DashboardCardBtcRelay showLink />
          </Box>
          <Box pad="xxsmall" align="center">
            <DashboardVaultActivityCard />
          </Box>
          <Box pad="xxsmall" align="center">
            <DashboardIssuedDaily />
          </Box>
          <Box pad="xxsmall" align="center">
            <DashboardRedeemedDaily />
          </Box>
          <Box pad="xxsmall" align="center">
            <DashboardVaults />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
});

DashboardPage.displayName = 'DashboardPage';
