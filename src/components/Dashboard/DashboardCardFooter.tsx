import React from 'react';
import { CardFooter } from 'grommet';

type Props = {};

export const DashboardCardFooter: React.FC<Props> = ({ children }) => {
  return (
    <CardFooter pad="small" background="light-1">
      {children}
    </CardFooter>
  );
};

DashboardCardFooter.displayName = 'DashboardCardFooter';
