import React, { useCallback, useEffect } from 'react';
import { useStores } from '../../../stores';
import { IColumn, Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import LinkBitcoin from '../../../components/LinkBitcoin';
import cn from 'classnames';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import { IRedeem } from '../../../modules/btcRelay/btcRelayTypes';
import { dateFormat } from '../../../utils';
import { satoshiToBitcoin, walletHexToBech32 } from '../../../services/bitcoin';
import { useParams } from 'react-router';
import { LinkHarmony } from '../../../components/LinkHarmony';

type Props = {};

export const DashboardRedeemsTable: React.FC<Props> = observer(() => {
  const { redeemListStore, routing, redeemPageStore } = useStores();

  const { redeemId } = useParams<{ redeemId: string }>();

  const onCloseModal = useCallback(() => {
    routing.goToDashboardRedeem({ replace: true });
  }, [routing]);

  useEffect(() => {
    if (typeof redeemId === 'string') {
      redeemPageStore.loadRedeemDetails(redeemId).then(() => {
        redeemPageStore.openRedeemDetailsModal(redeemId, onCloseModal);
      });
    }
  }, [redeemPageStore, redeemId, onCloseModal]);

  const handleRowClick = useCallback(
    (redeem: IRedeem) => {
      routing.goToDashboardRedeem({ redeemId: redeem.id });
    },
    [routing],
  );

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
      className: cn(s.column, s.columnAddress),
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkHarmony hash={value.vault} type="address" />
          </div>
        );
      },
    },
    {
      title: 'Output BTC Address',
      className: cn(s.column, s.columnAddress),
      key: 'id',
      width: '33',
      render: (value: IRedeem) => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkBitcoin
              hash={walletHexToBech32(value.btcAddress)}
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
      onRowClicked={handleRowClick}
      tableParams={{
        rowKey: (data: IRedeem) => data.id,
      }}
    />
  );
});

DashboardRedeemsTable.displayName = 'DashboardRedeemsTable';
