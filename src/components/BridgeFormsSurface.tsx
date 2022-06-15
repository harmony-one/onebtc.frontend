import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { prop } from 'bitcoinjs-lib/types/payments/lazy';

const StyledBox = styled(Box)`
  background: ${props => props.theme.surface.color};
  border-radius: 25px;
  box-shadow: ${props => props.theme.surface.boxShadow};
  border: ${props => props.theme.surface.border};
`;

interface Props {}

export const BridgeFormsSurface: React.FC<Props> = ({ children }) => {
  return (
    <StyledBox
      direction="column"
      align="center"
      justify="center"
      fill="horizontal"
      pad="large"
    >
      {children}
    </StyledBox>
  );
};

BridgeFormsSurface.displayName = 'BridgeFormsSurface';
