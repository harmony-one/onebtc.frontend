import React from 'react';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { useStores } from '../stores';
import { Box } from 'grommet';
import { VaultStatusDot } from './Dashboard/VaultStatus';
import { Text } from './Base';
import { cutText } from '../services/cutText';
import { formatWithEightDecimals } from '../utils';
import { satoshiToBitcoin } from '../services/bitcoin';

interface Props {
  vault: IVault;
}

export const VaultIssueSelectItem: React.FC<Props> = ({ vault }) => {
  const { vaultStore } = useStores();

  if (!vault) {
    return null;
  }

  const vaultInfo = vaultStore.getVaultInfo(vault);

  return (
    <Box direction="row" gap="xxsmall" align="center">
      <VaultStatusDot isActive={vaultInfo.isActive} />
      <Text>{cutText(vault.id)}: </Text>
      <Text bold>
        {formatWithEightDecimals(
          satoshiToBitcoin(vaultInfo.availableToIssueSat.toString()),
        )}
      </Text>
      <Text> 1BTC</Text>
    </Box>
  );
};

VaultIssueSelectItem.displayName = 'VaultIssueSelectItem';
