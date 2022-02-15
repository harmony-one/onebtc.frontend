import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';
import { DashboardVaultActivityChart } from './DashboardVaultActivityChart';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routePaths';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';

interface Props {}

export const DashboardVaultActivityCard: React.FC<Props> = observer(() => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Active vaults:</Text>
        <Text bold>{dashboardHistoryStore.activeVaultCount}</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardVaultActivityChart />
      </DashboardCardBody>
      <DashboardCardFooter>
        <Text>
          <NavLink to={routes.dashboardVault}>View all vaults</NavLink>
        </Text>
      </DashboardCardFooter>
    </DashboardCard>
  );
});

DashboardVaultActivityCard.displayName = 'VaultIssuedChart';
