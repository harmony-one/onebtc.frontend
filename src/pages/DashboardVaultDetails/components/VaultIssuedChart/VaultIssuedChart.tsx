import React from 'react';
import { Text } from '../../../../components/Base';
import { Box, DataChart } from 'grommet';

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
      <Text size="medium" bold align="center">
        Total locked:
      </Text>
      <DataChart
        data={data}
        pad="none"
        series={['date', 'amount']}
        axis={{
          x: { granularity: 'fine' },
          y: false,
        }}
        chart={[
          {
            property: 'amount',
            thickness: 'hair',
            type: 'line',
            color: '#47b8eb',
          },
          {
            property: 'amount',
            thickness: 'xsmall',
            type: 'point',
            point: 'circle',
          },
        ]}
        guide={{
          x: { granularity: 'fine' },
          y: { granularity: 'fine' },
        }}
        size={{ width: 'fill' }}
      />
    </Box>
  );
};

VaultIssuedChart.displayName = 'VaultIssuedChart';
