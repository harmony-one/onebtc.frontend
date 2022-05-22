import React from 'react';
import { Box, Image } from 'grommet';
import { Title } from './Base';

export const BridgeLogo = React.memo(() => {
  return (
    <Box direction="row" align="center">
      <Image height="32" src="/one.svg" margin={{ right: '8px' }} />
      <Title size="small" bold>
        1BTC By Harmony
      </Title>
    </Box>
  );
});
