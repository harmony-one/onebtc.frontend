import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';
import * as s from './DashboardVaultTable.styl';
import { satoshiToBitcoin } from '../../../services/bitcoin';
import { IVault } from '../../../modules/btcRelay/btcRelayTypes';
import LinkHarmonyAddress from '../../../components/LinkHarmonyAddress';
import { formatWithTwoDecimals } from '../../../utils';
import { Box } from 'grommet';
import { getVaultInfo } from '../../../modules/btcRelay/vaultHelpers';

type Props = {};

export const DashboardVaultTable: React.FC<Props> = observer(() => {
  const { vaultListStore, user } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      vaultListStore.onChangeDataFlow(props);
    },
    [vaultListStore],
  );

  const columns: IColumn<IVault>[] = [
    {
      title: 'Account ID',
      width: '33',
      className: s.column,
      key: 'id',
      render: value => {
        return (
          <LinkHarmonyAddress address={value.id}>{value.id}</LinkHarmonyAddress>
        );
      },
    },
    {
      title: 'Locked ONE',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return (
          <Text>
            {formatWithTwoDecimals(Number(value.collateral) / 1e18)} ONE
          </Text>
        );
      },
    },
    {
      title: 'Pending BTC',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <Text>{satoshiToBitcoin(value.toBeIssued)} BTC</Text>;
      },
    },
    {
      title: 'Locked BTC',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <Text>{satoshiToBitcoin(value.toBeRedeemed)} BTC</Text>;
      },
    },
    {
      title: 'Collateralization',
      className: s.column,
      key: 'id',
      width: '33',
      render: vault => {
        const vaultInfo = getVaultInfo(vault);
        const colorIssued = vaultInfo.collateralIssued >= 150 ? 'Green' : 'Red';
        const colorTotal = vaultInfo.collateralTotal >= 150 ? 'Green' : 'Red';

        return (
          <Box>
            <Text>
              <Text bold color={colorTotal}>
                {formatWithTwoDecimals(vaultInfo.collateralTotal)}%
              </Text>
            </Text>
            <Text>
              Pending:{' '}
              <Text bold color={colorIssued}>
                {formatWithTwoDecimals(vaultInfo.collateralIssued)}%
              </Text>
            </Text>
          </Box>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={vaultListStore.data}
      isPending={vaultListStore.isPending}
      dataLayerConfig={vaultListStore.dataFlow}
      onChangeDataFlow={handleChangeDataFlow}
      onRowClicked={() => {}}
      tableParams={{
        rowKey: (data: IVault) => data.id,
      }}
    />
  );
});

DashboardVaultTable.displayName = 'DashboardVaultTable';
