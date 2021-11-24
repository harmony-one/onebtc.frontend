import React from 'react';
import { BoxTypes, Card } from 'grommet';

type Props = {} & Pick<BoxTypes, 'pad'>;

export const DashboardCard: React.FC<Props> = ({ children, pad = 'none' }) => {
  return (
    <Card background="white" width="medium" height="medium" pad={pad}>
      {children}
    </Card>
  );
};

DashboardCard.displayName = 'DashboardCard';
