import React, { useEffect } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { Text } from '../../components/Base';
import { DashboardRedeemsTable } from './components/DashboardRedeemsTable';
import { DashboardRedeemChart } from '../Dashboard/components/DashboardRedeemChart';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { observer } from 'mobx-react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { DashboardCardHead } from '../../components/Dashboard/DashboardCardHead';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardBody } from '../../components/Dashboard/DashboardCardBody';

type Props = {};

export const DashboardRedeemsPage: React.FC<Props> = observer(() => {
  useEffect(() => {
    dashboardHistoryStore.loadData();
  }, []);
  return (
    <BaseLayout>
      <Box gap="medium">
        <Title align="center">Redeem Requests</Title>
        <Divider colorful fullwidth />
        <Box align="center">
          <DashboardCard width="medium">
            <DashboardCardHead>
              <Text bold>
                Redeemed: {dashboardHistoryStore.issuedTotal} BTC
              </Text>
            </DashboardCardHead>
            <DashboardCardBody>
              <DashboardRedeemChart />
            </DashboardCardBody>
          </DashboardCard>
        </Box>
        <DashboardRedeemsTable />
      </Box>
    </BaseLayout>
  );
});

DashboardRedeemsPage.displayName = 'DashboardRedeemsPage';
