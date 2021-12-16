import { Table } from 'components/Table';
import React, { useState } from 'react';
import { getOperationListStore } from '../getOperationStore';
import { OperationListTableColumns } from './OperationListTableColumns';
import { OperationDetails } from './OperationDetails';
import { Operation } from '../../../modules/vaultClient/VaultClient';
import { observer } from 'mobx-react';

interface Props {}

export const OperationListTable: React.FC<Props> = observer(() => {
  const operationListStore = getOperationListStore();

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const onChangeDataFlow = (props: any) => {
    operationListStore.onChangeDataFlow(props);
  };

  return (
    <Table
      data={operationListStore.data}
      columns={OperationListTableColumns}
      isPending={operationListStore.isPending}
      dataLayerConfig={operationListStore.dataFlow}
      onChangeDataFlow={onChangeDataFlow}
      onRowClicked={() => {}}
      tableParams={{
        rowKey: (data: Operation) => data.id,
        expandable: {
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
          expandedRowRender: (data: any) => <OperationDetails data={data} />,
          expandRowByClick: true,
        },
      }}
    />
  );
});

OperationListTable.displayName = 'OperationTable';
