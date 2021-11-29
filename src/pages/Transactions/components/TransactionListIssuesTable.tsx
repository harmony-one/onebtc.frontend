import React, { useCallback } from 'react';
import { getAddress } from '@harmony-js/crypto';
import { DashboardIssueTableColumns } from '../../DashboardIssues/components/DashboardIssueTableColumns';
import { IIssue } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { Table } from '../../../components/Table';
import { useIssueListStore } from '../utils';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react';

interface Props {}

export const TransactionListIssuesTable: React.FC<Props> = observer(() => {
  const { user, issuePageStore } = useStores();

  const store = useIssueListStore({
    requesterId: getAddress(user.address).checksum,
  });

  const handleRowClick = useCallback(
    (issue: IIssue) => {
      issuePageStore.openIssueDetailsModal(issue.id);
    },
    [issuePageStore],
  );

  return (
    <Table
      columns={DashboardIssueTableColumns}
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

TransactionListIssuesTable.displayName = 'TransactionListIssuesTable';
