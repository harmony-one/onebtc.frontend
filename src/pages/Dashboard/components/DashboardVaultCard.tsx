import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Box } from 'grommet';
import { Text } from '../../../components/Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import React from 'react';
import { DashboardCardCircle } from '../../../components/Dashboard/DashboardCardCircle';

interface Props {}

export const DashboardVaultCard: React.FC<Props> = () => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>Collateralization</Text>
          <Text bold>3351.63%</Text>
        </Box>
        <Box>
          <Text>
            <NavLink to={routes.dashboardVault}>VIEW ALL VAULTS</NavLink>
          </Text>
        </Box>
      </DashboardCardHead>
      <DashboardCardCircle
        title="513776.97001"
        subtext="Capacity"
        status="success"
      />
    </DashboardCard>
  );
};

DashboardVaultCard.displayName = 'DashboardVaultCard';
