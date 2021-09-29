import React from 'react';
import { Paper } from 'components/Paper';
import { Box } from 'grommet';
import * as s from './DashboardCard.styl';

type Props = {};

export const DashboardCard: React.FC<Props> = ({ children }) => {
  return (
    <Paper className={s.DashboardCard}>
      <Box gap="small" align="center">
        {children}
      </Box>
    </Paper>
  );
};

DashboardCard.displayName = 'DashboardCard';
