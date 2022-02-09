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

interface Props {}

export const DashboardVaultCard: React.FC<Props> = observer(() => {
  const capacity = formatZeroDecimals(dashboardHistoryStore.capacity);
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Collateralization</Text>
        <Text bold>3351.63%</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardCardCircle
          title={`${capacity} ONE`}
          subtext="Capacity"
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
