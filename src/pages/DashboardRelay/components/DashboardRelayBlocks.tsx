import React, { useCallback } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import LinkBitcoin from '../../../components/LinkBitcoin';
import { LinkHarmony } from '../../../components/LinkHarmony';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { IEvent } from '../../../modules/dashboard/dashboardTypes';

type Props = {};

export const DashboardRelayBlocks: React.FC<Props> = observer(() => {
  const { relayBlocksStore } = useStores();

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      relayBlocksStore.onChangeDataFlow(props);
    },
    [relayBlocksStore],
  );

  const columns: IColumn<IEvent>[] = [
    {
      title: 'Block height',
      width: 150,
      className: s.column,
      key: '_id',
      render: value => {
        return <div>{value.returnValues.height}</div>;
      },
    },
    {
      title: 'Block hash',
      className: cn(s.column, s.columnAddress),
      key: '_id',
      width: '33',
      render: value => {
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
      className: cn(s.column, s.columnAddress),
      key: '_id',
      width: '33',
      render: value => {
        return <LinkHarmony hash={value.transactionHash} type="tx" />;
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
        rowKey: (data: IEvent) => data._id,
      }}
    />
  );
});

DashboardRelayBlocks.displayName = 'DashboardRelayBlocks';
