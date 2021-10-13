import React from 'react';
import { Text } from '../Base';
import { Box } from 'grommet';
import { Theme } from '../../themes';

interface Props {
  isActive: boolean;
}

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
