import React, { useCallback } from 'react';
import { IIssue, IRedeem } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { Table } from '../../../components/Table';
import { useRedeemListStore } from '../utils';
import { useStores } from '../../../stores';
import { DashboardRedeemsTableColumns } from '../../DashboardRedeems/components/DashboardRedeemsTableColumns';
import { getAddress } from '@harmony-js/crypto';
import { observer } from 'mobx-react';

interface Props {}

export const TransactionListRedeemTable: React.FC<Props> = observer(() => {
  const { user, routing } = useStores();

  const store = useRedeemListStore({
    requesterId: getAddress(user.address).checksum,
  });

  const handleRowClick = useCallback(
    (redeem: IRedeem) => {
      routing.goToRedeemModalM(redeem.id);
    },
    [routing],
  );

  return (
    <Table
      columns={DashboardRedeemsTableColumns}
      data={store.data}
      isPending={store.isPending}
      dataLayerConfig={store.dataFlow}
      onChangeDataFlow={store.onChangeDataFlow}
      onRowClicked={handleRowClick}
      tableParams={{
        rowKey: (data: IIssue) => data.id,
      }}
    />
  );
});

TransactionListRedeemTable.displayName = 'TransactionListIssuesTable';
