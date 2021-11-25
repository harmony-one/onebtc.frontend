import React from 'react';
import { BoxTypes, Card } from 'grommet';

type Props = {} & Pick<BoxTypes, 'pad' | 'fill' | 'width' | 'height'>;

export const DashboardCard: React.FC<Props> = ({
  children,
  pad = 'none',
  width = 'medium',
  height = 'medium',
}) => {
  return (
    <Card background="white" width={width} height={height} pad={pad}>
      {children}
    </Card>
  );
};

DashboardCard.displayName = 'DashboardCard';
