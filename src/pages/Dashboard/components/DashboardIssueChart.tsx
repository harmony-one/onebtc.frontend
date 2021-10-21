import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { Line } from 'react-chartjs-2';

interface Props {}

export const DashboardIssueChart: React.FC<Props> = () => {
  return (
    <Line
      data={{
        datasets: [
          {
            label: 'Issued per day',
            data: dashboardHistoryStore.issueChartData,
            parsing: {
              yAxisKey: 'issuedPerDay',
            },
            borderColor: '#EE9F18',
            backgroundColor: '#EE9F18',
          },
          {
            label: 'Total issued',
            data: dashboardHistoryStore.issueChartData,
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
};

DashboardIssueChart.displayName = 'DashboardIssueChart';
