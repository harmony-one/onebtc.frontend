import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routePaths';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { useStores } from '../../../stores';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { observer } from 'mobx-react';
import { DashboardIssueChart } from './DashboardIssueChart';
import { formatWithTwoDecimals } from '../../../utils';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';

interface Props {}

export const DashboardIssueRedeemCard: React.FC<Props> = observer(() => {
  const { routing, ratesStore } = useStores();

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text bold>Issued</Text>
        <Text bold>
          {formatWithTwoDecimals(dashboardHistoryStore.issuedTotal)} 1BTC
        </Text>
        <Text bold>
          {formatWithTwoDecimals(
            dashboardHistoryStore.issuedTotal * ratesStore.BTC_USDT,
          )}
          $
        </Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardIssueChart />
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

DashboardIssueRedeemCard.displayName = 'DashboardIssueRedeemCard';
