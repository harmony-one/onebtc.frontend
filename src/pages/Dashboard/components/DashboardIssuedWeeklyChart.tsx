import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { Line } from 'react-chartjs-2';
import { observer } from 'mobx-react';

interface Props {}

export const DashboardIssuedWeeklyChart: React.FC<Props> = observer(() => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Issued per week',
            data: dashboardHistoryStore.issueWeeklyChartData,
            parsing: {
              yAxisKey: 'amountPerWeek',
            },
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
          },
          {
            label: 'Total issued',
            data: dashboardHistoryStore.issueWeeklyChartData,
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

DashboardIssuedWeeklyChart.displayName = 'DashboardIssuedWeeklyChart';
