import React from 'react';
import { CardHeader } from 'grommet';

type Props = {};

export const DashboardCardHead: React.FC<Props> = ({ children }) => {
  return (
    <CardHeader background="light-1" gap="xsmall" justify="start" pad="small">
      {children}
    </CardHeader>
  );
};

DashboardCardHead.displayName = 'DashboardCardHead';
