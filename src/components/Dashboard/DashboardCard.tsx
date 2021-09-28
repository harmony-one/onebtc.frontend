import React from 'react';
import { Paper } from 'components/Paper';
import { Box } from 'grommet';

type Props = {};

export const DashboardCard: React.FC<Props> = ({ children }) => {
  return (
    <Paper>
      <Box gap="small" align="center">
        {children}
      </Box>
    </Paper>
  );
};

DashboardCard.displayName = 'DashboardCard';
