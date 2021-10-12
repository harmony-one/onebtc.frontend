import React from 'react';
import { IIssue } from '../../../../modules/btcRelay/btcRelayTypes';
import { IColumn, Table } from '../../../../components/Table';
import * as s from '../../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { useStores } from '../../../../stores';
import { getVaultBalancesStore } from './VaultBalancesStore';
import { observer } from 'mobx-react';
import { satoshiToBitcoin } from '../../../../services/bitcoin';
import LinkBitcoin from '../../../../components/LinkBitcoin';

interface Props {
  vaultId: string;
}

export const VaultBalances: React.FC<Props> = observer(({ vaultId }) => {
  const { vaultStore } = useStores();
  const vault = vaultStore.vaultMap[vaultId];

  const store = getVaultBalancesStore(vaultId);

  const columns: IColumn<{ address: string; amount: string }>[] = [
    {
      title: 'BTC Address',
      width: 150,
      className: s.column,
      key: 'address',
      render: value => {
        return <LinkBitcoin hash={value.address} cut={false} type="wallet" />;
      },
    },
    {
      title: 'Amount',
      width: 150,
      className: s.column,
      key: 'amount',
      render: value => {
        return <div>{satoshiToBitcoin(value.amount)} BTC</div>;
      },
    },
  ];

  if (!vault) {
    return null;
  }

  return (
    <Table
      columns={columns}
      data={store.data}
      isPending={store.isPending}
      dataLayerConfig={store.dataFlow}
      hidePagination
      onChangeDataFlow={store.onChangeDataFlow}
      tableParams={{
        rowKey: (data: IIssue) => data.id,
      }}
    />
  );
});

VaultBalances.displayName = 'VaultBalances';
