import React from 'react';
import { Box, DataChart } from 'grommet';
import { dashboardPageStore } from '../DashboardPageStore';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardActiveVault: React.FC<Props> = observer(() => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>Active vaults: {dashboardPageStore.activeVaultCount}</Text>
        </Box>
      </DashboardCardHead>
      <Box pad="medium">
        <DataChart
          data={dashboardPageStore.vaultChartData}
          pad="none"
          legend
          series={['date', 'active', 'total']}
          axis={{
            x: { granularity: 'fine' },
            y: { granularity: 'fine' },
          }}
          chart={[
            {
              property: 'active',
              thickness: 'hair',
              type: 'line',
              color: '#4ae3a7',
            },
            {
              property: 'active',
              thickness: 'xsmall',
              type: 'point',
              point: 'circle',
              color: '#4ae3a7',
            },
            {
              property: 'total',
              thickness: 'hair',
              type: 'line',
              color: '#47b8eb',
            },
            {
              property: 'total',
              thickness: 'xsmall',
              type: 'point',
              point: 'circle',
              color: '#47b8eb',
            },
          ]}
          guide={{
            x: { granularity: 'fine' },
            y: { granularity: 'fine' },
          }}
          size={{ width: 'fill' }}
        />
      </Box>
    </DashboardCard>
  );
});

DashboardActiveVault.displayName = 'VaultIssuedChart';
