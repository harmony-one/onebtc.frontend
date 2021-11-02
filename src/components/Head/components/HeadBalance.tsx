import React from 'react';
import { Box, Text } from 'grommet';
import { formatWithSixDecimals, ones } from '../../../utils';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { satoshiToBitcoin } from '../../../services/bitcoin';

export const HeadBalance: React.FC = observer(() => {
  const { user } = useStores();

  if (!user.isAuthorized) {
    return null;
  }

  return (
    <Box gap="small" direction="row" align="center">
      <Box direction="row">
        <Text size="small" weight="bold">
          {formatWithSixDecimals(ones(user.balance))}
        </Text>
        <Text size="small">&nbsp;ONE</Text>
      </Box>
      <Box direction="row">
        <Text size="small" weight="bold">
          {satoshiToBitcoin(user.oneBTCBalance)}
        </Text>
        <Text size="small">&nbsp;1BTC</Text>
      </Box>
    </Box>
  );
});

HeadBalance.displayName = 'HeadBalance';
