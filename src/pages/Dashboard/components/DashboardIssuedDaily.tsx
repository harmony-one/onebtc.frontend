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
import { Box } from 'grommet/components/Box';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { DashboardCardCircle } from '../../../components/Dashboard/DashboardCardCircle';
import { formatZeroDecimals, formatWithTwoDecimals } from '../../../utils';
import { RowInfo } from './RowInfo';

interface Props {}

export const DashboardIssuedDaily: React.FC<Props> = observer(() => {
  const { routing, ratesStore } = useStores();

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Issued:</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <Box justify="center" fill gap="16px">
          <RowInfo>
            <Text bold>Today:&nbsp;</Text>
            <Text bold>
              {formatWithTwoDecimals(dashboardHistoryStore.issuedToday)} 1BTC :
              $
              {formatZeroDecimals(
                dashboardHistoryStore.issuedToday * ratesStore.BTC_USDT,
              )}
            </Text>
          </RowInfo>
          <RowInfo>
            <Text bold>Weekly:&nbsp;</Text>
            <Text bold>
              {formatWithTwoDecimals(dashboardHistoryStore.issuedWeekly)} 1BTC :
              $
              {formatZeroDecimals(
                dashboardHistoryStore.issuedWeekly * ratesStore.BTC_USDT,
              )}
            </Text>
          </RowInfo>
          <RowInfo>
            <Text bold>Monthly:&nbsp;</Text>
            <Text bold>
              {formatWithTwoDecimals(dashboardHistoryStore.issuedMonthly)} 1BTC
              : $
              {formatZeroDecimals(
                dashboardHistoryStore.issuedMonthly * ratesStore.BTC_USDT,
              )}
            </Text>
          </RowInfo>
        </Box>
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

DashboardIssuedDaily.displayName = 'DashboardIssuedDaily';
