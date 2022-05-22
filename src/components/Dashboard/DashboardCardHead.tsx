import React from 'react';
import { CardHeader } from 'grommet';

type Props = {};

export const DashboardCardHead: React.FC<Props> = ({ children }) => {
  return (
    <CardHeader background="#1b1b1c" gap="xsmall" justify="start" pad="small">
      {children}
    </CardHeader>
  );
};

DashboardCardHead.displayName = 'DashboardCardHead';
