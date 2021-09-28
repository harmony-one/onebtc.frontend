import React from 'react';
import { Box } from 'grommet';

type Props = {};

export const DashboardCardHead: React.FC<Props> = ({ children }) => {
  return (
    <Box direction="row" fill gap="small" justify="between">
      {children}
    </Box>
  );
};

DashboardCardHead.displayName = 'DashboradCardHead';
