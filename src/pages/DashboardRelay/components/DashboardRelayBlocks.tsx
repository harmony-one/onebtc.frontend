import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import LinkBitcoin from '../../../components/LinkBitcoin';
import LinkHarmonyTx from '../../../components/LinkHarmonyTx';
import * as s from './DashboardRelayBlocks.styl';
import { IBtcRelayEvent } from '../../../modules/btcRelay/btcRelayTypes';

type Props = {};

export const DashboardRelayBlocks: React.FC<Props> = observer(() => {
  const { relayBlocksStore } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      relayBlocksStore.onChangeDataFlow(props);
    },
    [relayBlocksStore],
  );

  const columns: IColumn<IBtcRelayEvent>[] = [
    {
      title: 'Block height',
      width: 150,
      className: s.column,
      key: '_id',
      render: (value: IBtcRelayEvent) => {
        return <div>{value.returnValues.height}</div>;
      },
    },
    {
      title: 'Block hash',
      className: s.column,
      key: '_id',
      width: '33',
      render: (value: IBtcRelayEvent) => {
        const blockHash = Buffer.from(value.returnValues.digest.slice(2), 'hex')
          .reverse()
          .toString('hex');

        return (
          <LinkBitcoin type="block" cut={false} hash={blockHash}>
            {blockHash}
          </LinkBitcoin>
        );
      },
    },
    {
      title: 'Harmony Transaction',
      className: s.column,
      key: '_id',
      width: '33',
      render: (value: IBtcRelayEvent) => {
        return <LinkHarmonyTx txHash={value.transactionHash} />;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      data={relayBlocksStore.data}
      isPending={relayBlocksStore.isPending}
      dataLayerConfig={relayBlocksStore.dataFlow}
      onChangeDataFlow={handleChangeDataFlow}
      onRowClicked={() => {}}
      tableParams={{
        rowKey: (data: IBtcRelayEvent) => data._id,
      }}
    />
  );
});

DashboardRelayBlocks.displayName = 'DashboardRelayBlocks';
