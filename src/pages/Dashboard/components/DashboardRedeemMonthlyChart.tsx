import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardIssuedMonthlyChart: React.FC<Props> = observer(() => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Redeemed per month',
            data: dashboardHistoryStore.redeemMonthlyChartData,
            parsing: {
              yAxisKey: 'amountPerMonth',
            },
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
          },
          {
            label: 'Total redeemed',
            data: dashboardHistoryStore.redeemMonthlyChartData,
            parsing: {
              yAxisKey: 'total',
            },
            borderColor: '#47b8eb',
            backgroundColor: '#47b8eb',
          },
        ],
      }}
    />
  );
});

DashboardIssuedMonthlyChart.displayName = 'DashboardIssuedMonthlyChart';
