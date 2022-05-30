import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardRedeemWeeklyChart: React.FC<Props> = observer(() => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Redeemed per week',
            data: dashboardHistoryStore.redeemWeeklyChartData,
            parsing: {
              yAxisKey: 'amountPerWeek',
            },
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
          },
          {
            label: 'Total redeemed',
            data: dashboardHistoryStore.redeemWeeklyChartData,
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

DashboardRedeemWeeklyChart.displayName = 'DashboardRedeemWeeklyChart';
