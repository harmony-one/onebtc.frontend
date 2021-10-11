import React from 'react';
import { IIssue } from '../../../../modules/btcRelay/btcRelayTypes';
import { Table } from '../../../../components/Table';
import { useStores } from '../../../../stores';
import { getVaultRedeemStore } from './VaultRedeemTableStore';
import { observer } from 'mobx-react';
import { DashboardRedeemsTableColumns } from '../../../DashboardRedeems/components/DashboardRedeemsTableColumns';

interface Props {
  vaultId: string;
}

export const VaultRedeemTable: React.FC<Props> = observer(({ vaultId }) => {
  const { vaultStore } = useStores();
  const vault = vaultStore.vaultMap[vaultId];

  const store = getVaultRedeemStore(vaultId);

  if (!vault) {
    return null;
  }

  return (
    <Table
      columns={DashboardRedeemsTableColumns}
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

VaultRedeemTable.displayName = 'VaultBalances';
