import React from 'react';
import { Button } from '../../Base';
import { Share } from 'grommet-icons';
import { Box } from 'grommet';

interface Props {}

export const FaucetButtons: React.FC<Props> = () => {
  return (
    <Box direction="row" gap="xsmall">
      <Button
        bordered
        color="Orange"
        style={{ borderColor: 'Orange', padding: '10px' }}
        transparent
        fontSize="14px"
        onClick={() => {
          window.open('https://testnet-faucet.mempool.co/', '_blank');
        }}
      >
        BTC Faucet&nbsp;
        <Share color="Orange" size="small" />
      </Button>
      <Button
        bordered
        color="#3fbbe0"
        style={{ borderColor: '#3fbbe0', padding: '10px' }}
        transparent
        fontSize="14px"
        onClick={() => {
          window.open('https://faucet.pops.one//', '_blank');
        }}
      >
        HMY Faucet&nbsp;
        <Share color="#3fbbe0" size="small" />
      </Button>
    </Box>
  );
};

FaucetButtons.displayName = 'FaucetButtons';
