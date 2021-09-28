import React, { useCallback } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import { IBtcRelayEvent } from '../../../modules/btcRelay/btcRelayClient';
import LinkBitcoinTx from '../../../components/LinkBitcoinTx';

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
      width: 200,
      key: '_id',
      render: (value: IBtcRelayEvent) => {
        return <div>{value.returnValues.height}</div>;
      },
    },
    {
      title: 'Block hash',
      key: '_id',
      width: 200,
      render: (value: IBtcRelayEvent) => {
        return (
          <LinkBitcoinTx txHash={value.blockHash}>
            {value.blockHash}
          </LinkBitcoinTx>
        );
      },
    },
    {
      title: 'Added to parachain',
      key: '_id',
      width: '200',
      render: (value: IBtcRelayEvent) => {
        return <div>{value.blockHash}</div>;
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
