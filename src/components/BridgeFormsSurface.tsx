import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const StyledBox = styled(Box)`
  background: ${props => props.theme.surfaceColor};
  border-radius: 25px;
  //box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  //border: 1px solid #dedede;
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
