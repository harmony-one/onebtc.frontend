import React from 'react';
import { Text } from '../../Base';
import { Box } from 'grommet';
import {
  formatWithEightDecimals,
  formatWithTwoDecimals,
  ones,
} from '../../../utils';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';
import { satoshiToBitcoin } from '../../../services/bitcoin';

export const HeadBalance: React.FC = observer(() => {
  const { user } = useStores();

  if (!user.isAuthorized) {
    return null;
  }

  const btcAmount = satoshiToBitcoin(user.oneBTCBalance);

  return (
    <>
    <Box direction="row" style={{borderRight: "1px black solid", marginRight: "20px", paddingRight: "20px"}}>
    <Text size="small" bold>
      {user.address}
    </Text>
  </Box>
    <Box direction="column" justify="center" align="end">

      <Box direction="row">
        <Text size="small" bold>
          {formatWithTwoDecimals(ones(user.balance))}
        </Text>
        <Text size="small">&nbsp;&nbsp;ONE</Text>
      </Box>
      <Box direction="row">
        <Text size="small" bold>
          {formatWithEightDecimals(btcAmount)}
        </Text>
        <Text size="small">&nbsp;1BTC</Text>
      </Box>
    </Box>
    </>
  );
});

HeadBalance.displayName = 'HeadBalance';
