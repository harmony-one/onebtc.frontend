import React from 'react';
import { useStores } from '../../../stores';
import { Box } from 'grommet';
import { Divider, Text } from '../../../components/Base';
import { satoshiToBitcoin } from '../../../services/bitcoin';
import { LinkHarmony } from '../../../components/LinkHarmony';
import { VaultStatus } from '../../../components/Dashboard/VaultStatus';
import { vaultBalancesStore } from '../../../stores/VaultStore';
import { observer } from 'mobx-react';
import { formatWithEightDecimals, formatZeroDecimals } from '../../../utils';
import utils from 'web3-utils';
import { InfoBlock } from '../../../components/InfoBlock';

interface Props {
  vaultId: string;
  syncProgress?: string;
}

export const VaultInfo: React.FC<Props> = React.memo(
  observer(({ vaultId, syncProgress }) => {
    const { vaultStore } = useStores();

    const vault = vaultStore.getEntity(vaultId);
    const vaultInfo = vaultStore.getVaultInfo(vault);

    const balance = vaultBalancesStore[vaultId] || 0;

    const collateralAlert =
      !!vault.collateral && vaultInfo.collateralTotal <= 125;
    const collateralWarning =
      !!vault.collateral && !collateralAlert && vaultInfo.collateralTotal < 150;

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

        {syncProgress && (
          <Box align="center" direction="row" width="100%" justify="between">
            <Box>
              <Text>Synchronized:</Text>
            </Box>
            <Box>
              <Text bold>
                {formatZeroDecimals(Number(syncProgress) * 100)}%
              </Text>
            </Box>
          </Box>
        )}

        <Divider fullwidth />
        <Box direction="column" width="100%">
          <Box>
            <Text>Address:</Text>
          </Box>
          <Box>
            <Text bold>
              <LinkHarmony cut={false} hash={vault.id} type="address" />
            </Text>
          </Box>
        </Box>
        <Divider fullwidth />
        <Box direction="row" width="100%" align="start" justify="between">
          <Box>
            <Text>Collateral:</Text>
          </Box>
          <Box>
            <Text bold>{utils.fromWei(vaultInfo.collateral || '0')} ONE</Text>
          </Box>
        </Box>
        <Divider fullwidth />
        <Box direction="row" width="100%" align="start" justify="between">
          <Box>
            <Text>Total issued:</Text>
          </Box>
          <Box>
            <Text bold>
              {formatWithEightDecimals(satoshiToBitcoin(vaultInfo.issuedSat))}{' '}
              BTC
            </Text>
          </Box>
        </Box>
        <Divider fullwidth />
        <Box direction="row" width="100%" align="start" justify="between">
          <Box>
            <Text>Total BTC balance:</Text>
          </Box>
          <Box>
            <Text bold>
              {formatWithEightDecimals(satoshiToBitcoin(balance))} BTC
            </Text>
          </Box>
        </Box>

        <Divider fullwidth />
        <Box direction="row" width="100%" align="start" justify="between">
          <Box>
            <Text>Collateralization/Pending:</Text>
          </Box>
          <Box>
            <Text bold>
              {Math.round(vaultInfo.collateralIssued)}%&nbsp;/&nbsp;
              {Math.round(vaultInfo.collateralTotal)}%
            </Text>
          </Box>
        </Box>
        {collateralAlert && (
          <InfoBlock
            title="Warning"
            text="if the ratio falls below 100%, the vault runs into the liquidation risk"
            color="red"
          />
        )}
        {collateralWarning && (
          <InfoBlock
            title="Info"
            text="if the ratio falls below 100%, the vault runs into the liquidation risk"
            color="green"
          />
        )}
        <Divider fullwidth />
        <Box direction="row" width="100%" align="start" justify="between">
          <Box>
            <Text>Pending:</Text>
          </Box>
          <Box>
            <Text bold>
              {formatWithEightDecimals(
                satoshiToBitcoin(vaultInfo.toBeIssuedSat),
              )}{' '}
              BTC
            </Text>
          </Box>
        </Box>
        <Divider fullwidth />
        <Box direction="row" width="100%" align="start" justify="between">
          <Box>
            <Text>Locked:</Text>
          </Box>
          <Box>
            <Text bold>
              {formatWithEightDecimals(
                satoshiToBitcoin(vaultInfo.toBeRedeemedSat),
              )}{' '}
              BTC
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }),
);

VaultInfo.displayName = 'VaultInfo';
