import React from 'react';
import { Text } from '../../Base';
import { Box } from 'grommet';

interface Props {
  label: string;
  balance: string;
  tokenName: string;
}

export const InputLabelAvailableBalance: React.FC<Props> = ({
  label,
  balance,
  tokenName,
}) => {
  return (
    <Box
      justify="between"
      align="center"
      direction="row"
      margin={{ bottom: 'xxsmall' }}
    >
      <Text bold size="large">
        {label}
      </Text>
      <Box direction="row">
        <Text size="small" color="#707A8A">
          Available:
        </Text>
        <Text size="small" bold>
          &nbsp;{balance}
        </Text>
        <Text size="small" color="#707A8A">
          &nbsp;{tokenName}
        </Text>
      </Box>
    </Box>
  );
};

InputLabelAvailableBalance.displayName = 'InputLabelAvailableBalance';
