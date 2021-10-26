import React from 'react';
import { Box } from 'grommet';
import { DashboardCollateralChart } from '../../../Dashboard/components/DashboardCollateralChart';

interface Props {}

const data = [];
for (let i = 1; i < 8; i += 1) {
  const v = Math.sin(i / 2.0);
  data.push({
    date: `2021-10-${((i % 30) + 1).toString().padStart(2, '0')}`,
    amount: Math.round(Math.abs(v * 10)),
  });
}

export const VaultIssuedChart: React.FC<Props> = () => {
  return (
    <Box gap="small">
      <DashboardCollateralChart />
    </Box>
  );
};

VaultIssuedChart.displayName = 'VaultIssuedChart';
