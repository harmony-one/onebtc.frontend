import React, { useCallback, useMemo } from 'react';
import {
  IIssue,
  IRedeem,
} from '../../../../../onebtc.sdk/lib/dashboard-api/interfaces';
import { Table } from '../../../components/Table';
import { getRequesterRedeemStore } from '../utils';
import { useStores } from '../../../stores';
import { DashboardRedeemsTableColumns } from '../../DashboardRedeems/components/DashboardRedeemsTableColumns';
import { getAddress } from '@harmony-js/crypto';
import { observer } from 'mobx-react';

interface Props {}

export const TransactionListRedeemTable: React.FC<Props> = observer(() => {
  const { user, redeemPageStore } = useStores();

  const store = useMemo(() => {
    return getRequesterRedeemStore(getAddress(user.address).checksum);
  }, [user.address]);

  const handleRowClick = useCallback(
    (redeem: IRedeem) => {
      redeemPageStore.openRedeemDetailsModal(redeem.id);
    },
    [redeemPageStore],
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
