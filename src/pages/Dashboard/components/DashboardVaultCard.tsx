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

export const DashboardVaultCard: React.FC<Props> = observer(() => {
  const { ratesStore } = useStores();
  const capacity = formatZeroDecimals(dashboardHistoryStore.capacity);

  const capacityUsd =
    Number(dashboardHistoryStore.capacity) * ratesStore.ONE_USDT;

  const issuedUsd = dashboardHistoryStore.issuedTotal * ratesStore.BTC_USDT;
  const collateralization = (capacityUsd / issuedUsd) * 100;

  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Collateralization:</Text>
        <Text bold>{formatZeroDecimals(collateralization)}%</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardCardCircle
          title="Capacity"
          subtext={
            <Box align="center">
              <Box>{capacity} ONE</Box>
              <Box>≈${`${formatZeroDecimals(capacityUsd)}`}</Box>
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

DashboardVaultCard.displayName = 'DashboardVaultCard';
