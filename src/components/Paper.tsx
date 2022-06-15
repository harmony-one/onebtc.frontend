import React from 'react';
import { Box, BoxProps } from 'grommet';
import styled from 'styled-components';

type Props = {
  className?: string;
} & Pick<BoxProps, 'pad' | 'fill'>;

const StyledBox = styled(Box)`
  background: ${props => props.theme.surface.color};
  box-shadow: ${props => props.theme.surface.boxShadow};
  border: ${props => props.theme.surface.border};
  border-radius: 4px;
`;

export const Paper: React.FC<Props> = React.memo(
  ({ className = '', pad = 'small', fill, children }) => {
    return (
      <StyledBox fill={fill} pad={pad} className={className}>
        {children}
      </StyledBox>
    );
  },
);

Paper.displayName = 'Paper';
