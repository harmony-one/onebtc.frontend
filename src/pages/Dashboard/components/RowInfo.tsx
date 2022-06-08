import React from 'react';
import { Box } from 'grommet/components/Box';
import styled from 'styled-components';

const BoxStyled = styled(Box)`
  border-bottom: 3px solid #49e3a7;
  padding-bottom: 4px;
`;

interface Props {}

export const RowInfo: React.FC<Props> = ({ children }) => {
  return (
    <BoxStyled justify="between" direction="row">
      {children}
    </BoxStyled>
  );
};

RowInfo.displayName = 'RowInfo';
