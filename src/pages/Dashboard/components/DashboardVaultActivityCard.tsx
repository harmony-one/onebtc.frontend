import React from 'react';
import { Box } from 'grommet';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';
import { DashboardVaultActivityChart } from './DashboardVaultActivityChart';

interface Props {}

export const DashboardVaultActivityCard: React.FC<Props> = observer(() => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>Active vaults: {dashboardHistoryStore.activeVaultCount}</Text>
        </Box>
      </DashboardCardHead>
      <Box>
        <DashboardVaultActivityChart />
      </Box>
    </DashboardCard>
  );
});

DashboardVaultActivityCard.displayName = 'VaultIssuedChart';
