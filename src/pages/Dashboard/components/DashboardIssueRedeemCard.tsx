import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Box } from 'grommet';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { useStores } from '../../../stores';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { observer } from 'mobx-react';
import { DashboardIssueChart } from './DashboardIssueChart';
import { formatWithTwoDecimals } from '../../../utils';

interface Props {}

export const DashboardIssueRedeemCard: React.FC<Props> = observer(() => {
  const { routing, user } = useStores();
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>Issued</Text>
          <Text bold>
            {formatWithTwoDecimals(dashboardHistoryStore.issuedTotal)} 1BTC
          </Text>
          <Text bold>
            {formatWithTwoDecimals(
              dashboardHistoryStore.issuedTotal * user.btcRate,
            )}
            $
          </Text>
        </Box>
        <Box alignContent="end">
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
        <DashboardIssueChart />
      </Box>
    </DashboardCard>
  );
});

DashboardIssueRedeemCard.displayName = 'DashboardIssueRedeemCard';
