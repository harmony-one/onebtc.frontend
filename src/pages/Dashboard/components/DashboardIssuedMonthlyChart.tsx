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
            label: 'Issued per week',
            data: dashboardHistoryStore.issueMonthlyChartData,
            parsing: {
              yAxisKey: 'amountPerMonth',
            },
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
          },
          {
            label: 'Total issued',
            data: dashboardHistoryStore.issueMonthlyChartData,
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
