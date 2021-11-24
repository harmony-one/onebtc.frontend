import React from 'react';
import { BoxTypes, Card } from 'grommet';

type Props = {} & Pick<BoxTypes, 'pad' | 'fill' | 'width'>;

export const DashboardCard: React.FC<Props> = ({
  children,
  pad = 'none',
  width = 'medium',
}) => {
  return (
    <Card background="white" width={width} height="medium" pad={pad}>
      {children}
    </Card>
  );
};

DashboardCard.displayName = 'DashboardCard';
