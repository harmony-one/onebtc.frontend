import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { Text } from './Base';
import { formatWithTenDecimals, formatWithTwoDecimals } from '../utils';

type PriceViewProps = {
  tokenName: string;
  value: number | string;
  rate: number;
  boxProps?: BoxProps;
};
export const PriceView: React.FC<PriceViewProps> = props => {
  const { tokenName, value, rate, boxProps = {} } = props;

  const usdValue = Number(value) * rate;
  return (
    <Box direction="column" align="end" justify="center" {...boxProps}>
      <Text style={{ fontSize: 14 }}>
        {formatWithTenDecimals(value)}&nbsp;{tokenName}
      </Text>
      <Text size="xsmall" color="rgba(102, 102, 102, 0.9)">
        ≈${formatWithTwoDecimals(usdValue)}
      </Text>
    </Box>
  );
};
