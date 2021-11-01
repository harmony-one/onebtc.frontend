import React, { useMemo } from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';
import { Box } from 'grommet';

interface Props {
  hash: string;
  text?: string;
  type: 'wallet' | 'tx' | 'block';
  cut?: boolean;
}

const typeMap = {
  wallet: config.bitcoin.explorer.wallet,
  tx: config.bitcoin.explorer.transaction,
  block: config.bitcoin.explorer.block,
};

const LinkBitcoin: React.FC<Props> = ({
  hash = '',
  type,
  text,
  cut = true,
}) => {
  const link = typeMap[type] + hash;

  const content = useMemo(() => {
    if (text) {
      return text;
    }

    if (!cut) {
      return hash;
    }

    return cutText(hash);
  }, [hash, text, cut]);

  return (
    <Box direction="row" align="center" gap="xxsmall">
      <img src="/bitcoin.svg" style={{ height: 22 }} />
      <a target="_blank" rel="noreferrer" href={link}>
        {content}
      </a>
    </Box>
  );
};

export default LinkBitcoin;
