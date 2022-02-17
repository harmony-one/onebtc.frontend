import React, { useCallback } from 'react';
import { IRedeem } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { Table } from '../../../../components/Table';
import { useStores } from '../../../../stores';
import { getVaultRedeemStore } from './VaultRedeemTableStore';
import { observer } from 'mobx-react';
import { DashboardRedeemsTableColumns } from '../../../DashboardRedeems/components/DashboardRedeemsTableColumns';

interface Props {
  vaultId: string;
}

export const VaultRedeemTable: React.FC<Props> = observer(({ vaultId }) => {
  const { vaultStore, routing } = useStores();
  const vault = vaultStore.getEntity(vaultId);

  const store = getVaultRedeemStore(vaultId);

  const handleRowClick = useCallback(
    (redeem: IRedeem) => {
      routing.goToRedeemModalM(redeem.id);
    },
    [routing],
  );

  if (!vault) {
    return null;
  }

  return (
    <Table
      columns={DashboardRedeemsTableColumns}
      data={store.data}
      isPending={store.isPending}
      dataLayerConfig={store.dataFlow}
      onRowClicked={handleRowClick}
      onChangeDataFlow={store.onChangeDataFlow}
      tableParams={{
        rowKey: (data: IRedeem) => data.id,
      }}
    />
  );
});

VaultRedeemTable.displayName = 'VaultBalances';
