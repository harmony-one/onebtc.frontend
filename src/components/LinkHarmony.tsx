import React, { MouseEventHandler, useMemo } from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';
import { Box } from 'grommet';
import * as s from './LinkBlockchain.styl';
import cn from 'classnames';

interface Props {
  hash: string;
  href?: string;
  text?: string;
  type: 'address' | 'tx' | 'block';
  cut?: boolean;
  mono?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const typeMap = {
  address: config.harmony.explorer.address,
  tx: config.harmony.explorer.transaction,
};

export const LinkHarmony: React.FC<Props> = ({
  hash = '',
  type,
  text,
  cut = true,
  mono = false,
  href,
  onClick = () => undefined,
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
      <img src="/one.svg" className={s.icon} alt="bitcoin" />
      <a
        className={cn(s.link, {
          [s.mono]: mono,
        })}
        title={hash}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
        href={href || link}
      >
        {content}
      </a>
    </Box>
  );
};
