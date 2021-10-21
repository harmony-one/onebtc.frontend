import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Box, DataChart } from 'grommet';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { useStores } from '../../../stores';
import { dashboardPageStore } from '../DashboardPageStore';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardIssueRedeemCard: React.FC<Props> = observer(() => {
  const { routing, user } = useStores();
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>Issued</Text>
          <Text bold>{dashboardPageStore.issuedToday} OneBTC</Text>
          <Text bold>{dashboardPageStore.issuedToday * user.btcRate} </Text>
        </Box>
        <Box fill alignContent="end">
          <Text align="right">
            <NavLink to={routing.generatePath(routes.dashboardIssue)}>
              VIEW ALL ISSUED
            </NavLink>
          </Text>
          <Text align="right">
            <NavLink to={routing.generatePath(routes.dashboardRedeem)}>
              VIEW ALL REDEEMED
            </NavLink>
          </Text>
        </Box>
      </DashboardCardHead>
      <Box>
        <DataChart
          data={dashboardPageStore.issueChartData}
          pad="none"
          legend
          series={['date', 'issuedPerDay', 'total']}
          axis={{
            x: { granularity: 'fine' },
            y: { granularity: 'fine' },
          }}
          chart={[
            {
              property: 'issuedPerDay',
              thickness: 'hair',
              type: 'line',
              color: '#4ae3a7',
            },
            {
              property: 'issuedPerDay',
              thickness: 'xsmall',
              type: 'point',
              point: 'circle',
              color: '#4ae3a7',
            },
            {
              property: 'total',
              thickness: 'hair',
              type: 'line',
              color: '#47b8eb',
            },
            {
              property: 'total',
              thickness: 'xsmall',
              type: 'point',
              point: 'circle',
              color: '#47b8eb',
            },
          ]}
          guide={{
            x: { granularity: 'fine' },
            y: { granularity: 'fine' },
          }}
          size={{ width: 'fill' }}
        />
      </Box>
    </DashboardCard>
  );
});

DashboardIssueRedeemCard.displayName = 'DashboardIssueRedeemCard';
