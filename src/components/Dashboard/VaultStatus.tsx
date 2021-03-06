import React from 'react';
import { Text } from '../Base';
import { Box } from 'grommet';
import { Theme } from '../../themes';
import styled from 'styled-components';

interface Props {
  isActive: boolean;
}

export const VaultStatusDot = styled.div<Props>`
  background-color: ${props =>
    props.isActive ? Theme.global.colors.Green600 : Theme.global.colors.Red600};
  border-radius: 10px;
  content: ' ';
  display: block;
  height: 10px;
  width: 10px;
`;

export const VaultStatus: React.FC<Props> = ({ isActive }) => {
  if (isActive) {
    return (
      <Box
        style={{ borderRadius: '7px', padding: '4px 16px' }}
        background={Theme.global.colors.Green500}
        align="center"
      >
        <Text bold color="Green">
          online
        </Text>
      </Box>
    );
  }

  return (
    <Box
      round
      style={{ borderRadius: '7px', padding: '4px 16px' }}
      background={Theme.global.colors.Red500}
      align="center"
    >
      <Text bold color="Red">
        offline
      </Text>
    </Box>
  );
};

VaultStatus.displayName = 'VaultStatus';
