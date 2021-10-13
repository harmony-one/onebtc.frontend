import React from 'react';
import { Box, BoxProps } from 'grommet';
import cn from 'classnames';
import * as s from './Paper.styl';

type Props = {
  className?: string;
} & Pick<BoxProps, 'pad'>;

export const Paper: React.FC<Props> = React.memo(
  ({ className = '', pad = 'small', children }) => {
    return (
      <Box fill pad={pad} className={cn(s.root, className)}>
        {children}
      </Box>
    );
  },
);

Paper.displayName = 'Paper';
