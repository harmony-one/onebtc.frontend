import React, { useCallback } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { Text } from '../../components/Base';
import { DashboardIssuesTable } from './components/DashboardIssuesTable';
import { DashboardIssueChart } from '../Dashboard/components/DashboardIssueChart';
import { observer } from 'mobx-react';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { DashboardCard } from '../../components/Dashboard/DashboardCard';
import { DashboardCardBody } from '../../components/Dashboard/DashboardCardBody';
import { DashboardCardHead } from '../../components/Dashboard/DashboardCardHead';
import { useInterval } from '../../hooks/useInterval';
import { ONE_MINUTE } from '../../constants/date';

type Props = {};

export const DashboardIssuesPage: React.FC<Props> = observer(() => {
  const loadData = useCallback(() => {
    dashboardHistoryStore.loadData();
  }, []);

  useInterval({
    callback: loadData,
    timeout: ONE_MINUTE * 10,
  });

  return (
    <BaseLayout>
      <Box gap="medium">
        <Title align="center">Issue Requests</Title>
        <Divider colorful fullwidth />

        <Box align="center">
          <DashboardCard width="medium">
            <DashboardCardHead>
              <Text bold>Issued: {dashboardHistoryStore.issuedTotal} 1BTC</Text>
            </DashboardCardHead>
            <DashboardCardBody>
              <DashboardIssueChart />
            </DashboardCardBody>
          </DashboardCard>
        </Box>

        <DashboardIssuesTable />
      </Box>
    </BaseLayout>
  );
});

DashboardIssuesPage.displayName = 'DashboardIssuesPage';
