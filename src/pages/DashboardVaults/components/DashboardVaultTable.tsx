import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import { IIssue, IVault } from '../../../modules/btcRelay/btcRelayClient';
import LinkBitcoin from '../../../components/LinkBitcoin';
import * as s from './DashboardVaultTable.styl';
import LinkHarmonyAddress from '../../../components/LinkHarmonyAddress';

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
      width: 150,
      className: s.column,
      key: 'id',
      render: (value: IVault) => {
        return <div>{value.id}</div>;
      },
    },
    {
      title: 'Amount',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IVault) => {
        return <div>{value.collateral}</div>;
      },
    },
    {
      title: 'Vault replaceCollateral',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IVault) => {
        return <LinkHarmonyAddress address={value.replaceCollateral} />;
      },
    },
    {
      title: 'toBeIssued',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IVault) => {
        return <LinkBitcoin hash={value.toBeIssued} type="wallet" />;
      },
    },
    {
      title: 'toBeRedeemed',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IVault) => {
        return <div>{value.toBeRedeemed}</div>;
      },
    },
    {
      title: 'toBeReplaced',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IVault) => {
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
