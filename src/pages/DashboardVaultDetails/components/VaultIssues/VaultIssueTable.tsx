import React from 'react';
import { IIssue } from '../../../../modules/btcRelay/btcRelayTypes';
import { Table } from '../../../../components/Table';
import { useStores } from '../../../../stores';
import { getVaultIssuesStore } from './VaultIssueTableStore';
import { observer } from 'mobx-react';
import { DashboardIssueTableColumns } from '../../../DashboardIssues/components/DashboardIssueTableColumns';

interface Props {
  vaultId: string;
}

export const VaultIssueTable: React.FC<Props> = observer(({ vaultId }) => {
  const { vaultStore } = useStores();
  const vault = vaultStore.vaultMap[vaultId];

  const store = getVaultIssuesStore(vaultId);

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
      tableParams={{
        rowKey: (data: IIssue) => data.id,
      }}
    />
  );
});

VaultIssueTable.displayName = 'VaultBalances';
