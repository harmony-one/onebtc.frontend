import React from 'react';
import { CardBody } from 'grommet';
import styled from 'styled-components';

type Props = {};

const CardBodyStyled = styled(CardBody)`
  background: ${props => props.theme.dashboardCard.bodyBackground};
`;

export const DashboardCardBody: React.FC<Props> = ({ children }) => {
  return (
    <CardBodyStyled pad="small" align="center">
      {children}
    </CardBodyStyled>
  );
};

DashboardCardBody.displayName = 'DashboardCardBody';
