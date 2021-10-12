import React, { useCallback, useEffect } from 'react';
import { useStores } from '../../../stores';
import { Table } from '../../../components/Table';
import { observer } from 'mobx-react';
import { IRedeem } from '../../../modules/btcRelay/btcRelayTypes';
import { useParams } from 'react-router';
import { DashboardRedeemsTableColumns } from './DashboardRedeemsTableColumns';

type Props = {};

export const DashboardRedeemsTable: React.FC<Props> = observer(() => {
  const { redeemListStore, routing, redeemPageStore } = useStores();

  const { redeemId } = useParams<{ redeemId: string }>();

  const onCloseModal = useCallback(() => {
    routing.goToDashboardRedeem({ replace: true });
  }, [routing]);

  useEffect(() => {
    if (typeof redeemId === 'string') {
      redeemPageStore.openRedeemDetailsModal(redeemId, onCloseModal);
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

  return (
    <Table
      columns={DashboardRedeemsTableColumns}
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
