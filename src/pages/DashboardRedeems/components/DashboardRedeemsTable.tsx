import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import LinkBitcoin from '../../../components/LinkBitcoin';
import * as s from './DashboardRedeemsTable.styl';
import LinkHarmonyAddress from '../../../components/LinkHarmonyAddress';
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import { IRedeem } from '../../../modules/btcRelay/btcRelayTypes';
import { dateFormat } from '../../../utils';
import { satoshiToBitcoin, walletHexToBech32 } from '../../../services/bitcoin';

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
        return <div>{dateFormat(new Date(Number(value.opentime) * 1000))}</div>;
      },
    },
    {
      title: 'Amount',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return <div>{satoshiToBitcoin(value.amountBtc)} BTC</div>;
      },
    },
    {
      title: 'Vault Account',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkHarmonyAddress address={value.vault} />
          </div>
        );
      },
    },
    {
      title: 'Output BTC Address',
      className: s.column,
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkBitcoin
              hash={walletHexToBech32(value.btcAddress)}
              cut={false}
              type="wallet"
            />
          </div>
        );
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
