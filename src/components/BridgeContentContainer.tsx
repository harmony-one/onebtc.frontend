import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

const StyledBox = styled(Box)`
  width: 560px;
  min-width: 320px;
`;

interface Props {}

export const BridgeContentContainer: React.FC<Props> = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

BridgeContentContainer.displayName = 'BridgeContentContainer';
