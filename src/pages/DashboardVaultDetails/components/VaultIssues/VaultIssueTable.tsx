import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { IIssue } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { Table } from '../../../../components/Table';
import { useStores } from '../../../../stores';
import { getVaultIssuesStore } from './VaultIssueTableStore';
import { DashboardIssueTableColumns } from '../../../DashboardIssues/components/DashboardIssueTableColumns';

interface Props {
  vaultId: string;
}

export const VaultIssueTable: React.FC<Props> = observer(({ vaultId }) => {
  const { vaultStore, routing } = useStores();
  const vault = vaultStore.getEntity(vaultId);

  const store = getVaultIssuesStore(vaultId);

  const handleRowClick = useCallback(
    (issue: IIssue) => {
      routing.goToIssueModalM(issue.id);
    },
    [routing],
  );

  if (!vault) {
    return null;
  }

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

VaultIssueTable.displayName = 'VaultBalances';
