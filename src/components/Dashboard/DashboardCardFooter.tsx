import React from 'react';
import { CardFooter } from 'grommet';

type Props = {};

export const DashboardCardFooter: React.FC<Props> = ({ children }) => {
  return (
    <CardFooter pad="small" background="#1b1b1c">
      {children}
    </CardFooter>
  );
};

DashboardCardFooter.displayName = 'DashboardCardFooter';
