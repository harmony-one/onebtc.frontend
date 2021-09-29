import React from 'react';
import { Box, BoxProps } from 'grommet';
import cn from 'classnames';
import * as s from './Paper.styl';

type Props = {
  className?: string;
};

export const Paper: React.FC<Props> = React.memo(
  ({ className = '', children }) => {
    return (
      <Box
        fill
        pad={{ vertical: 'small', horizontal: 'small' }}
        className={cn(s.root, className)}
      >
        {children}
      </Box>
    );
  },
);

Paper.displayName = 'Paper';
