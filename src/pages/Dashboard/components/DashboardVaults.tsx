import React from 'react';
import { Box } from 'grommet';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';
import { DashboardCollateralChart } from './DashboardCollateralChart';

interface Props {}

export const DashboardVaults: React.FC<Props> = observer(() => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>
            Locked collateral: {dashboardHistoryStore.totalCollateral} ONE
          </Text>
        </Box>
      </DashboardCardHead>
      <Box>
        <DashboardCollateralChart />
      </Box>
    </DashboardCard>
  );
});

DashboardVaults.displayName = 'VaultIssuedChart';
