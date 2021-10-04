import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Box } from 'grommet';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { useStores } from '../../../stores';

interface Props {}

export const DashboardIssueRedeemCard: React.FC<Props> = () => {
  const { routing } = useStores();
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>Issued</Text>
          <Text bold>2.21695 OneBTC</Text>
          <Text bold>$93763.49</Text>
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
    </DashboardCard>
  );
};

DashboardIssueRedeemCard.displayName = 'DashboardIssueRedeemCard';
