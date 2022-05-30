import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routePaths';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';
import { DashboardIssuedMonthlyChart } from './DashboardIssuedMonthlyChart';

interface Props {}

export const DashboardRedeemMonthlyCard: React.FC<Props> = observer(() => {
  const { routing } = useStores();

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Redeemed Monthly:</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardIssuedMonthlyChart />
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

DashboardRedeemMonthlyCard.displayName = 'DashboardRedeemMonthlyCard';
