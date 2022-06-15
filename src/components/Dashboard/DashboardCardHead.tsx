import React from 'react';
import { CardHeader } from 'grommet';
import styled from 'styled-components';

type Props = {};

const CardHeaderStyled = styled(CardHeader)`
  background: ${props => props.theme.dashboardCard.background};
`;

export const DashboardCardHead: React.FC<Props> = ({ children }) => {
  return (
    <CardHeaderStyled gap="xsmall" justify="start" pad="small">
      {children}
    </CardHeaderStyled>
  );
};

DashboardCardHead.displayName = 'DashboardCardHead';
