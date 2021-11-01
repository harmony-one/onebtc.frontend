import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { Table } from '../../../components/Table';
import { useStores } from '../../../stores';
import { IIssue } from '../../../modules/dashboard/dashboardTypes';
import { DashboardIssueTableColumns } from './DashboardIssueTableColumns';

type Props = {};

export const DashboardIssuesTable: React.FC<Props> = observer(() => {
  const { issueListStore, issuePageStore, routing } = useStores();

  const { issueId } = useParams<{ issueId: string }>();

  const onCloseModal = useCallback(() => {
    routing.goToDashboardIssue({ replace: true });
  }, [routing]);

  useEffect(() => {
    if (typeof issueId === 'string') {
      issuePageStore.openIssueDetailsModal(issueId, onCloseModal);
    }
  }, [issuePageStore, issueId, onCloseModal]);

  const handleChangeDataFlow = useCallback(
    (props: any) => {
      issueListStore.onChangeDataFlow(props);
    },
    [issueListStore],
  );

  const handleRowClick = useCallback(
    (issue: IIssue) => {
      routing.goToDashboardIssue({ issueId: issue.id });
    },
    [routing],
  );

  return (
    <Table
      columns={DashboardIssueTableColumns}
      data={issueListStore.data}
      isPending={issueListStore.isPending}
      dataLayerConfig={issueListStore.dataFlow}
      onChangeDataFlow={handleChangeDataFlow}
      onRowClicked={handleRowClick}
      tableParams={{
        rowKey: (data: IIssue) => data.id,
      }}
    />
  );
});

DashboardIssuesTable.displayName = 'DashboardIssuesTable';
