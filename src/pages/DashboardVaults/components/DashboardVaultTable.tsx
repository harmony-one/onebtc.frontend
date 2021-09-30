import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import LinkBitcoin from '../../../components/LinkBitcoin';
import * as s from './DashboardVaultTable.styl';
import LinkHarmonyAddress from '../../../components/LinkHarmonyAddress';
import { satoshiToBitcoin } from '../../../services/bitcoin';
import { IIssue, IVault } from '../../../modules/btcRelay/btcRelayTypes';

type Props = {};

export const DashboardVaultTable: React.FC<Props> = observer(() => {
  const { vaultListStore } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      vaultListStore.onChangeDataFlow(props);
    },
    [vaultListStore],
  );

  const columns: IColumn<IVault>[] = [
    {
      title: 'Account ID',
      width: 300,
      className: s.column,
      key: 'id',
      render: value => {
        return <div>{value.id}</div>;
      },
    },
    {
      title: 'Collateral',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <div>{satoshiToBitcoin(value.collateral)}</div>;
      },
    },
    {
      title: 'Replace Collateral',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <div>{value.replaceCollateral}</div>;
      },
    },
    {
      title: 'Be Issued',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <div>{value.toBeIssued}</div>;
      },
    },
    {
      title: 'Be Redeemed',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <div>{value.toBeRedeemed}</div>;
      },
    },
    {
      title: 'Be Replaced',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <div>{value.toBeReplaced}</div>;
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
