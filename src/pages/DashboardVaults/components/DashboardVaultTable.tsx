import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';
import cn from 'classnames';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { satoshiToBitcoin } from '../../../services/bitcoin';
import { IVault } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { formatWithEightDecimals, formatWithTwoDecimals } from '../../../utils';
import { Box } from 'grommet';
import { LinkHarmony } from '../../../components/LinkHarmony';
import { VaultStatus } from '../../../components/Dashboard/VaultStatus';

type Props = {};

export const DashboardVaultTable: React.FC<Props> = observer(() => {
  const { dashboardVaultListStore, routing, vaultStore } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      dashboardVaultListStore.onChangeDataFlow(props);
    },
    [dashboardVaultListStore],
  );

  const handleRowClick = useCallback(
    (vault: IVault) => {
      routing.goToVault(vault.id);
    },
    [routing],
  );

  const columns: IColumn<IVault>[] = [
    {
      title: 'Vault Address',
      width: '33',
      className: cn(s.column, s.columnAddress),
      key: 'id',
      render: value => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkHarmony hash={value.id} type="address" />
          </div>
        );
      },
    },
    {
      title: 'Locked ONE',
      className: s.column,
      key: 'id',
      sortable: true,
      dataIndex: 'collateral',
      width: '33',
      render: (value, vault) => {
        return (
          <Text>
            {formatWithTwoDecimals(Number(vault.collateral) / 1e18)} ONE
          </Text>
        );
      },
    },
    {
      title: 'Pending BTC',
      className: s.column,
      key: 'id',
      width: '33',
      sortable: true,
      dataIndex: 'toBeIssued',
      render: (value, vault) => {
        const amount = satoshiToBitcoin(vault.toBeIssued);
        return <Text>{formatWithEightDecimals(amount)} BTC</Text>;
      },
    },
    {
      title: 'Locked BTC',
      className: s.column,
      key: 'id',
      width: '33',
      sortable: true,
      dataIndex: 'toBeRedeemed',
      render: (value, vault) => {
        const vaultInfo = vaultStore.getVaultInfo(vault);
        const amount = satoshiToBitcoin(vaultInfo.toBeRedeemedSat.toString());
        return <Text>{formatWithEightDecimals(amount)} BTC</Text>;
      },
    },
    {
      title: 'Collateralization',
      className: s.column,
      key: 'id',
      dataIndex: 'collateral',
      width: '33',
      render: (value, vault) => {
        const vaultInfo = vaultStore.getVaultInfo(vault);
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
    {
      title: 'Status',
      className: s.column,
      key: 'id',
      width: '33',
      sortable: true,
      dataIndex: 'lastPing',
      render: (value, vault) => {
        const { isActive } = vaultStore.getVaultInfo(vault);
        return <VaultStatus isActive={isActive} />;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={dashboardVaultListStore.data.filter(item => !!item.collateral)}
      isPending={dashboardVaultListStore.isPending}
      dataLayerConfig={dashboardVaultListStore.dataFlow}
      onChangeDataFlow={handleChangeDataFlow}
      onRowClicked={handleRowClick}
      tableParams={{
        rowKey: (data: IVault) => data.id,
      }}
    />
  );
});

DashboardVaultTable.displayName = 'DashboardVaultTable';
