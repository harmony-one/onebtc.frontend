import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import LinkBitcoin from '../../../components/LinkBitcoin';
import * as s from './DashboardRedeemsTable.styl';
import LinkHarmonyAddress from '../../../components/LinkHarmonyAddress';
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import { IRedeem } from '../../../modules/btcRelay/btcRelayTypes';

type Props = {};

export const DashboardRedeemsTable: React.FC<Props> = observer(() => {
  const { redeemListStore } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      redeemListStore.onChangeDataFlow(props);
    },
    [redeemListStore],
  );

  const columns: IColumn<IRedeem>[] = [
    {
      title: 'Date',
      width: 150,
      className: s.column,
      key: 'id',
      render: (value: IRedeem) => {
        return <div>{value.opentime}</div>;
      },
    },
    {
      title: 'Amount',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return <div>{value.amount}</div>;
      },
    },
    {
      title: 'Vault Account',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return <LinkHarmonyAddress address={value.vault} />;
      },
    },
    {
      title: 'Vault BTC Address',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return <LinkBitcoin hash={value.btcAddress} type="wallet" />;
      },
    },
    {
      title: 'Status',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return <EntityStatus status={value.status} />;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={redeemListStore.data}
      isPending={redeemListStore.isPending}
      dataLayerConfig={redeemListStore.dataFlow}
      onChangeDataFlow={handleChangeDataFlow}
      onRowClicked={() => {}}
      tableParams={{
        rowKey: (data: IRedeem) => data.id,
      }}
    />
  );
});

DashboardRedeemsTable.displayName = 'DashboardRedeemsTable';
