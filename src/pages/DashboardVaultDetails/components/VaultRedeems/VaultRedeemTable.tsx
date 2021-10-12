import React, { useCallback } from 'react';
import { IRedeem } from '../../../../modules/btcRelay/btcRelayTypes';
import { Table } from '../../../../components/Table';
import { useStores } from '../../../../stores';
import { getVaultRedeemStore } from './VaultRedeemTableStore';
import { observer } from 'mobx-react';
import { DashboardRedeemsTableColumns } from '../../../DashboardRedeems/components/DashboardRedeemsTableColumns';

interface Props {
  vaultId: string;
}

export const VaultRedeemTable: React.FC<Props> = observer(({ vaultId }) => {
  const { vaultStore, redeemPageStore } = useStores();
  const vault = vaultStore.vaultMap[vaultId];

  const store = getVaultRedeemStore(vaultId);

  const handleRowClick = useCallback(
    (redeem: IRedeem) => {
      redeemPageStore.openRedeemDetailsModal(redeem.id);
    },
    [redeemPageStore],
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
