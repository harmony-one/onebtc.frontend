import React from 'react';
import { Box, Text } from 'grommet';
import { formatWithSixDecimals, ones } from '../../../utils';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react-lite';

export const HeadBalance: React.FC = observer(() => {
  const {user} = useStores();

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
          {formatWithSixDecimals(user.oneBTCBalance / 1e8)}
        </Text>
        <Text size="small">&nbsp;OneBTC</Text>
      </Box>
    </Box>
  );
});

HeadBalance.displayName = 'HeadBalance';
