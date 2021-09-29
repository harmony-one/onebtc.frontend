import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import { IIssue } from '../../../modules/btcRelay/btcRelayClient';
import LinkBitcoin from '../../../components/LinkBitcoin';
import * as s from './DashboardIssuesTable.styl';
import LinkHarmonyAddress from '../../../components/LinkHarmonyAddress';

type Props = {};

export const DashboardIssuesTable: React.FC<Props> = observer(() => {
  const { issueListStore } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      issueListStore.onChangeDataFlow(props);
    },
    [issueListStore],
  );

  const columns: IColumn<IIssue>[] = [
    {
      title: 'Date',
      width: 150,
      className: s.column,
      key: 'id',
      render: (value: IIssue) => {
        return <div>{value.opentime}</div>;
      },
    },
    {
      title: 'Amount',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IIssue) => {
        return <div>{value.amount}</div>;
      },
    },
    {
      title: 'Vault Account',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IIssue) => {
        return <LinkHarmonyAddress address={value.vault} />;
      },
    },
    {
      title: 'Vault BTC Address',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IIssue) => {
        return <LinkBitcoin hash={value.btcAddress} type="wallet" />;
      },
    },
    {
      title: 'Status',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IIssue) => {
        return <div>{value.status}</div>;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={issueListStore.data}
      isPending={issueListStore.isPending}
      dataLayerConfig={issueListStore.dataFlow}
      onChangeDataFlow={handleChangeDataFlow}
      onRowClicked={() => {}}
      tableParams={{
        rowKey: (data: IIssue) => data.id,
      }}
    />
  );
});

DashboardIssuesTable.displayName = 'DashboardIssuesTable';
