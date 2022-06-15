import React from 'react';
import { CardFooter } from 'grommet';
import styled from 'styled-components';

type Props = {};

const CardFooterStyled = styled(CardFooter)`
  background: ${props => props.theme.dashboardCard.background};
`;

export const DashboardCardFooter: React.FC<Props> = ({ children }) => {
  return <CardFooterStyled pad="small">{children}</CardFooterStyled>;
};

DashboardCardFooter.displayName = 'DashboardCardFooter';
