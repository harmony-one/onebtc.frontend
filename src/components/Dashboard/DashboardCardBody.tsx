import React from 'react';
import { CardBody } from 'grommet';

type Props = {};

export const DashboardCardBody: React.FC<Props> = ({ children }) => {
  return (
    <CardBody pad="small" align="center" background="dark-1">
      {children}
    </CardBody>
  );
};

DashboardCardBody.displayName = 'DashboardCardBody';
