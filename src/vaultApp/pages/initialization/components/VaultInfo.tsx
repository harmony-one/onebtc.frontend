import React from 'react';
import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { Text } from '../../../../components/Base';
import { useStores } from '../../../../stores';

interface Props {}

export const VaultInfo: React.FC<Props> = observer(() => {
  const { vaultAppStore } = useStores().vaultApp;
  const vaultInfo = vaultAppStore.vaultInfo;

  if (!vaultInfo) {
    return null;
  }

  return (
    <Box>
      <Box direction="row" gap="small">
        <Text>synchronized: </Text>
        <Text>{vaultInfo.synchronized ? 'yes' : 'no'}</Text>
      </Box>
      <Box direction="row" gap="small">
        <Text>status: </Text>
        <Text>{vaultInfo.status}</Text>
      </Box>
      <Box direction="row" gap="small">
        <Text>vault address: </Text>
        <Text>{vaultInfo.vaultAddress}</Text>
      </Box>
      <Box direction="row" gap="small">
        <Text>contract address: </Text>
        <Text>{vaultInfo.contract}</Text>
      </Box>
    </Box>
  );
});

VaultInfo.displayName = 'VaultInfo';
