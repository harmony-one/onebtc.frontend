import React, { useMemo } from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';
import { Box } from 'grommet';

interface Props {
  hash: string;
  text?: string;
  type: 'address' | 'tx' | 'block';
  cut?: boolean;
}

const typeMap = {
  address: config.harmony.explorer.testnet.address,
  tx: config.bitcoin.explorer.testnet.transaction,
};

export const LinkHarmony: React.FC<Props> = ({
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
      <img src="/one.svg" style={{ height: 22 }} />
      <a
        style={{ fontFamily: 'Courier' }}
        target="_blank"
        rel="noreferrer"
        href={link}
      >
        {content}
      </a>
    </Box>
  );
};
