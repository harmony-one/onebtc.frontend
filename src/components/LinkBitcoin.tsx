import React, { useMemo } from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';
import * as s from './LinkBlockchain.styl';
import { Box, ResponsiveContext } from 'grommet';
import cn from 'classnames';

interface Props {
  hash: string;
  text?: string;
  type: 'wallet' | 'tx' | 'block';
  cut?: boolean;
  mono?: boolean;
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
  mono = false,
}) => {
  const link = typeMap[type] + hash;

  const size = React.useContext(ResponsiveContext);

  console.log('### size', size);

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
      <img src="/bitcoin.svg" alt="harmony" className={s.icon} />
      <a
        className={cn(s.link, {
          [s.mono]: mono,
        })}
        target="_blank"
        rel="noreferrer"
        title={hash}
        href={link}
      >
        {content}
      </a>
    </Box>
  );
};

export default LinkBitcoin;
