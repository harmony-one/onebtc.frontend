import React from 'react';
import { Text } from '../Base';

interface Props {
  isActive: boolean;
}

export const VaultStatus: React.FC<Props> = ({ isActive }) => {
  if (isActive) {
    return (
      <Text bold color="Green">
        active
      </Text>
    );
  }

  return (
    <Text bold color="Red">
      offline
    </Text>
  );
};

VaultStatus.displayName = 'VaultStatus';
