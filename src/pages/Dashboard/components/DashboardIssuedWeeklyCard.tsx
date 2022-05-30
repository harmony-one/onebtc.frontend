import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routePaths';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react';
import { DashboardIssuedWeeklyChart } from './DashboardIssuedWeeklyChart';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';

interface Props {}

export const DashboardIssuedWeeklyCard: React.FC<Props> = observer(() => {
  const { routing } = useStores();

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Issued Weekly:</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardIssuedWeeklyChart />
      </DashboardCardBody>
      <DashboardCardFooter>
        <Text>
          <NavLink to={routing.generatePath(routes.dashboardIssue)}>
            View all issued
          </NavLink>
        </Text>
        <Text>
          <NavLink to={routing.generatePath(routes.dashboardRedeem)}>
            View all redeemed
          </NavLink>
        </Text>
      </DashboardCardFooter>
    </DashboardCard>
  );
});

DashboardIssuedWeeklyCard.displayName = 'DashboardIssuedWeeklyCard';
