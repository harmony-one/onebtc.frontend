import React, { useMemo } from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';

interface Props {
  hash: string;
  text?: string;
  type: 'wallet' | 'tx' | 'block';
  cut?: boolean;
}

const typeMap = {
  wallet: config.bitcoin.explorer.testnet.wallet,
  tx: config.bitcoin.explorer.testnet.transaction,
  block: config.bitcoin.explorer.testnet.block,
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
    <a target="_blank" rel="noreferrer" href={link}>
      {content}
    </a>
  );
};

export default LinkBitcoin;
