import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardRedeemChart: React.FC<Props> = observer(() => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Redeemed per day',
            data: dashboardHistoryStore.redeemChartData,
            parsing: {
              yAxisKey: 'redeemedPerDay',
            },
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
          },
          {
            label: 'Total redeemed',
            data: dashboardHistoryStore.redeemChartData,
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

DashboardRedeemChart.displayName = 'DashboardIssueChart';
