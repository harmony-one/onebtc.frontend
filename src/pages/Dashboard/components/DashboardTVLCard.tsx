import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routePaths';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';
import { observer } from 'mobx-react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { formatZeroDecimals, formatWithTwoDecimals } from '../../../utils';
import { useStores } from '../../../stores';
import { Box } from 'grommet';
import { RowInfo } from './RowInfo';
import { PriceView } from '../../../components/PriceView';

interface Props {}

export const DashboardTVLCard: React.FC<Props> = observer(() => {
  const { ratesStore, routing } = useStores();

  const lockedBTC =
    dashboardHistoryStore.issuedTotal - dashboardHistoryStore.redeemedTotal;
  const lockedUSD = lockedBTC * ratesStore.BTC_USDT;

  const issuedBTC = dashboardHistoryStore.issuedTotal;
  const issuedUSD = issuedBTC * ratesStore.BTC_USDT;
  const redeemedBTC = dashboardHistoryStore.redeemedTotal;
  const redeemedUSD = redeemedBTC * ratesStore.BTC_USDT;

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Total Value Locked:</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <Box justify="center" fill gap="16px">
          <RowInfo>
            <Text bold>Locked:</Text>
            <Text bold>
              <PriceView
                tokenName="1BTC"
                value={lockedBTC}
                rate={ratesStore.BTC_USDT}
              />
            </Text>
          </RowInfo>
          <RowInfo>
            <Text bold>Issued:</Text>
            <Text bold>
              <PriceView
                tokenName="1BTC"
                value={issuedBTC}
                rate={ratesStore.BTC_USDT}
              />
            </Text>
          </RowInfo>
          <RowInfo>
            <Text bold>Redeemed:</Text>
            <Text bold>
              <PriceView
                tokenName="1BTC"
                value={redeemedBTC}
                rate={ratesStore.BTC_USDT}
              />
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

DashboardTVLCard.displayName = 'DashboardVaultCard';
