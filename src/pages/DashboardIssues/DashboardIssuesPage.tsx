import React, { useEffect } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { Text } from 'components/Base';
import { DashboardIssuesTable } from './components/DashboardIssuesTable';
import { DashboardIssueChart } from '../Dashboard/components/DashboardIssueChart';
import { Paper } from '../../components/Paper';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

type Props = {};

export const DashboardIssuesPage: React.FC<Props> = observer(() => {
  const { issueListStore } = useStores();

  useEffect(() => {
    dashboardHistoryStore.loadData();
  }, []);
  return (
    <BaseLayout>
      <Box gap="medium">
        <Title align="center">Issue Requests</Title>
        <Divider colorful fullwidth />
        <Box direction="row-responsive" gap="medium" alignContent="stretch">
          <Paper>
            <Box gap="xsmall">
              <Box
                align="center"
                direction="row"
                width="100%"
                justify="between"
              >
                <Box>
                  <Text>Issued:</Text>
                </Box>
                <Box>{dashboardHistoryStore.issuedTotal} 1BTC</Box>
              </Box>
              <Divider fullwidth />
              <Box
                align="center"
                direction="row"
                width="100%"
                justify="between"
              >
                <Box>
                  <Text>Successful Issue Requests:</Text>
                </Box>
                <Box>{issueListStore.paginationData.totalElements}</Box>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <DashboardIssueChart />
          </Paper>
        </Box>
        <DashboardIssuesTable />
      </Box>
    </BaseLayout>
  );
});

DashboardIssuesPage.displayName = 'DashboardIssuesPage';
