import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routePaths';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { DashboardCardCircle } from '../../../components/Dashboard/DashboardCardCircle';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';
import { observer } from 'mobx-react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { formatZeroDecimals } from '../../../utils';
import { useStores } from '../../../stores';
import { Box } from 'grommet';

interface Props {}

export const DashboardTVLCard: React.FC<Props> = observer(() => {
  const { ratesStore } = useStores();

  const lockedUSD =
    Number(dashboardHistoryStore.capacity) * ratesStore.ONE_USDT;

  const issued1BTC =
    dashboardHistoryStore.issuedTotal - dashboardHistoryStore.redeemedTotal;
  const issuedUSD = issued1BTC * ratesStore.BTC_USDT;

  const TVL = issuedUSD + lockedUSD;

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Total Value Locked:</Text>
        <Text bold>ONE + BTC</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardCardCircle
          title="TVL"
          subtext={
            <Box align="center">
              <Box>≈${`${formatZeroDecimals(TVL)}`}</Box>
            </Box>
          }
          status="success"
        />
      </DashboardCardBody>
      <DashboardCardFooter>
        <Text>
          <NavLink to={routes.dashboardVault}>View all vaults</NavLink>
        </Text>
      </DashboardCardFooter>
    </DashboardCard>
  );
});

DashboardTVLCard.displayName = 'DashboardVaultCard';
