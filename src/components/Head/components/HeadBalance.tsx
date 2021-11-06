import React from 'react';
import { Text } from '../../Base';
import { Box } from 'grommet';
import { formatWithTwoDecimals, ones } from '../../../utils';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { satoshiToBitcoin } from '../../../services/bitcoin';

export const HeadBalance: React.FC = observer(() => {
  const { user } = useStores();

  if (!user.isAuthorized) {
    return null;
  }

  return (
    <Box direction="column" justify="center" align="end">
      <Box direction="row">
        <Text size="small" bold>
          {formatWithTwoDecimals(ones(user.balance))}
        </Text>
        <Text size="small">&nbsp;&nbsp;ONE</Text>
      </Box>
      <Box direction="row">
        <Text size="small" bold>
          {satoshiToBitcoin(user.oneBTCBalance).toString()}
        </Text>
        <Text size="small">&nbsp;1BTC</Text>
      </Box>
    </Box>
  );
});

HeadBalance.displayName = 'HeadBalance';
