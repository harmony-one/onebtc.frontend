import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardVaultActivityChart: React.FC<Props> = observer(() => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Active vaults',
            data: dashboardHistoryStore.vaultActivityChart,
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
            parsing: {
              yAxisKey: 'active',
            },
          },
          {
            label: 'Total vaults',
            data: dashboardHistoryStore.vaultActivityChart,
            borderColor: '#47b8eb',
            backgroundColor: '#47b8eb',
            parsing: {
              yAxisKey: 'total',
            },
          },
        ],
      }}
    />
  );
});

DashboardVaultActivityChart.displayName = 'DashboardVaultChat';
