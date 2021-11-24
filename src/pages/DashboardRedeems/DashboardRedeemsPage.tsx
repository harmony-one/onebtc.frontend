import React, { useEffect } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardRedeemsTable } from './components/DashboardRedeemsTable';
import { Paper } from '../../components/Paper';
import { DashboardRedeemChart } from '../Dashboard/components/DashboardRedeemChart';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

type Props = {};

export const DashboardRedeemsPage: React.FC<Props> = observer(() => {
  const { redeemListStore } = useStores();
  useEffect(() => {
    dashboardHistoryStore.loadData();
  }, []);
  return (
    <BaseLayout>
      <Box gap="medium">
        <Title align="center">Redeem Requests</Title>
        <Divider colorful fullwidth />
        <Box direction="row-responsive" gap="xsmall">
          <Paper>
            <Box gap="xsmall">
              <Box
                align="center"
                direction="row"
                width="100%"
                justify="between"
              >
                <Box>Redeemed:</Box>
                <Box>{dashboardHistoryStore.issuedTotal} BTC</Box>
              </Box>
              <Divider fullwidth />
              <Box
                align="center"
                direction="row"
                width="100%"
                justify="between"
              >
                <Box>Successful Redeemed Requests:</Box>
                <Box>{redeemListStore.paginationData.totalElements}</Box>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <DashboardRedeemChart />
          </Paper>
        </Box>
        <DashboardRedeemsTable />
      </Box>
    </BaseLayout>
  );
});

DashboardRedeemsPage.displayName = 'DashboardRedeemsPage';
