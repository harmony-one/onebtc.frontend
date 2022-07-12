import React, { useMemo } from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';
import * as s from './LinkBlockchain.styl';
import { Box } from 'grommet';
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

const LinkDashboard: React.FC<Props> = ({
  hash = '',
  type,
  text,
  cut = true,
  mono = false,
}) => {
  return (
    <Box direction="row" align="center" gap="xxsmall">
      <img src="/one.svg" alt="harmony" className={s.icon} />
      <a
        className={cn(s.link, {
          [s.mono]: mono,
        })}
        target="_blank"
        rel="noreferrer"
        title={hash}
        href={`https://btc.harmony.one/dashboard/issues/${hash}`}
      >
        {cutText(hash)}
      </a>
    </Box>
  );
};

export default LinkDashboard;