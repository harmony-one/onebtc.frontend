import React from 'react';
import { useStores } from '../../../stores';
import { Box } from 'grommet';
import { getVaultInfo } from '../../../modules/btcRelay/vaultHelpers';
import { Divider, Text } from '../../../components/Base';
import { satoshiToBitcoin } from '../../../services/bitcoin';
import { LinkHarmony } from '../../../components/LinkHarmony';
import { VaultStatus } from '../../../components/Dashboard/VaultStatus';

interface Props {
  vaultId: string;
}

export const VaultInfo: React.FC<Props> = ({ vaultId }) => {
  const { vaultStore } = useStores();

  const vault = vaultStore.getEntity(vaultId);
  const vaultInfo = getVaultInfo(vault);

  return (
    <Box direction="column" gap="xsmall">
      <Box align="center" direction="row" width="100%" justify="between">
        <Box>
          <Text>Status:</Text>
        </Box>
        <Box>
          <Text bold>
            <VaultStatus isActive={vaultInfo.isActive} />
          </Text>
        </Box>
      </Box>
      <Divider fullwidth />
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Address:</Text>
        </Box>
        <Box>
          <Text bold>
            <LinkHarmony hash={vault.id} type="address" />
          </Text>
        </Box>
      </Box>
      <Divider fullwidth />
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Collateral:</Text>
        </Box>
        <Box>
          <Text bold>{vaultInfo.oneAmount} ONE</Text>
        </Box>
      </Box>
      <Divider fullwidth />
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Total issued:</Text>
        </Box>
        <Box>
          <Text bold>{satoshiToBitcoin(vaultInfo.issuedSat)} BTC</Text>
        </Box>
      </Box>
      <Divider fullwidth />
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Collateralization:</Text>
        </Box>
        <Box>
          <Text bold>{Math.round(vaultInfo.collateralTotal)}%</Text>
        </Box>
      </Box>
      <Divider fullwidth />
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Pending:</Text>
        </Box>
        <Box>
          <Text bold>{satoshiToBitcoin(vaultInfo.toBeIssuedSat)} BTC</Text>
        </Box>
      </Box>
      <Divider fullwidth />
      <Box direction="row" width="100%" align="start" justify="between">
        <Box>
          <Text>Locked:</Text>
        </Box>
        <Box>
          <Text bold>{satoshiToBitcoin(vaultInfo.toBeRedeemedSat)} BTC</Text>
        </Box>
      </Box>
    </Box>
  );
};

VaultInfo.displayName = 'VaultInfo';
