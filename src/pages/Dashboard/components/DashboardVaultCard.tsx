import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { DashboardCardCircle } from '../../../components/Dashboard/DashboardCardCircle';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';
import { DashboardCardFooter } from '../../../components/Dashboard/DashboardCardFooter';

interface Props {}

export const DashboardVaultCard: React.FC<Props> = () => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Collateralization</Text>
        <Text bold>3351.63%</Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardCardCircle
          title="513776.97001"
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
};

DashboardVaultCard.displayName = 'DashboardVaultCard';
