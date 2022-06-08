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
import { formatZeroDecimals, formatWithTwoDecimals } from '../../../utils';
import { RowInfo } from './RowInfo';

interface Props {}

export const DashboardRedeemedDaily: React.FC<Props> = observer(() => {
  const { routing, ratesStore } = useStores();

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Redeemed:</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <Box justify="center" fill gap="16px">
          <RowInfo>
            <Text bold>Today:&nbsp;</Text>
            <Text bold>
              {formatWithTwoDecimals(dashboardHistoryStore.redeemedToday)} 1BTC
              : $
              {formatZeroDecimals(
                dashboardHistoryStore.redeemedToday * ratesStore.BTC_USDT,
              )}
            </Text>
          </RowInfo>
          <RowInfo>
            <Text bold>Weekly:&nbsp;</Text>
            <Text bold>
              {formatWithTwoDecimals(dashboardHistoryStore.redeemedWeekly)} 1BTC
              : $
              {formatZeroDecimals(
                dashboardHistoryStore.redeemedWeekly * ratesStore.BTC_USDT,
              )}
            </Text>
          </RowInfo>
          <RowInfo>
            <Text bold>Monthly:&nbsp;</Text>
            <Text bold>
              {formatWithTwoDecimals(dashboardHistoryStore.redeemedMonthly)}{' '}
              1BTC : $
              {formatZeroDecimals(
                dashboardHistoryStore.redeemedMonthly * ratesStore.BTC_USDT,
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

DashboardRedeemedDaily.displayName = 'DashboardRedeemedDaily';
