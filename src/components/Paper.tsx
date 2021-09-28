import React from 'react';
import { Box, BoxProps } from 'grommet';
import * as s from './Paper.styl';

type Props = {};

export const Paper: React.FC<Props> = React.memo(({ children }) => {
  return (
    <Box
      fill
      pad={{ vertical: 'small', horizontal: 'small' }}
      className={s.root}
    >
      {children}
    </Box>
  );
});

Paper.displayName = 'Paper';
