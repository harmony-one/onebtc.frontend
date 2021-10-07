import React from 'react';
import { useStores } from '../../../stores';
import { Box } from 'grommet';
import { getVaultInfo } from '../../../modules/btcRelay/vaultHelpers';
import { Text } from '../../../components/Base';
import { Paper } from '../../../components/Paper';
import { satoshiToBitcoin } from '../../../services/bitcoin';

interface Props {
  vaultId: string;
}

export const VaultInfo: React.FC<Props> = ({ vaultId }) => {
  const { vaultStore } = useStores();

  const vault = vaultStore.vaultMap[vaultId];
  const vaultInfo = getVaultInfo(vault);

  return (
    <Box>
      <Box direction="row" gap="xsmall">
        <Paper>
          <Text>Collateral:</Text>
          <Text bold>{vaultInfo.oneAmount} ONE</Text>
        </Paper>
        <Paper>
          <Text>Issued:</Text>
          <Text bold>{satoshiToBitcoin(vaultInfo.issuedSat)} BTC</Text>
        </Paper>
        <Paper>
          <Text>Collateralization:</Text>
          <Text bold>{Math.round(vaultInfo.collateralTotal)}%</Text>
        </Paper>
        <Paper>
          <Text>Pending:</Text>
          <Text bold>{satoshiToBitcoin(vaultInfo.toBeIssuedSat)} BTC</Text>
        </Paper>
        <Paper>
          <Text>Locked:</Text>
          <Text bold>{satoshiToBitcoin(vaultInfo.toBeRedeemedSat)} BTC</Text>
        </Paper>
      </Box>
    </Box>
  );
};

VaultInfo.displayName = 'VaultInfo';
