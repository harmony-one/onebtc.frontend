import React, { useMemo } from 'react';
import { Box, DataChart } from 'grommet';
import { dashboardPageStore } from '../DashboardPageStore';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardVaults: React.FC<Props> = observer(() => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Box>
          <Text>
            Locked collateral: {dashboardPageStore.totalCollateral} OneBTC
          </Text>
        </Box>
      </DashboardCardHead>
      <Box pad="medium">
        <DataChart
          data={dashboardPageStore.vaultChartData}
          pad="none"
          series={['date', 'totalCollateral']}
          axis={{
            x: { granularity: 'fine' },
            y: { granularity: 'fine' },
          }}
          chart={[
            {
              property: 'totalCollateral',
              thickness: 'hair',
              type: 'line',
              color: '#4ae3a7',
            },
            {
              property: 'totalCollateral',
              thickness: 'xsmall',
              type: 'point',
              point: 'circle',
              color: '#4ae3a7',
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

DashboardVaults.displayName = 'VaultIssuedChart';
