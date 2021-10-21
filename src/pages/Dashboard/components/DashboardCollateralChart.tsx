import React from 'react';
import { Line } from 'react-chartjs-2';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardCollateralChart: React.FC<Props> = observer(() => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Total Locked',
            data: dashboardHistoryStore.vaultTotalLockedChart,
            borderColor: '#47b8eb',
            backgroundColor: '#47b8eb',
          },
        ],
      }}
    />
  );
});

DashboardCollateralChart.displayName = 'DashboardCollateralChart';
