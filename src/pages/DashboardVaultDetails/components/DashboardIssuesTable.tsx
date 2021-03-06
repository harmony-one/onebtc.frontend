import React, { useCallback, useEffect } from 'react';
import utils from 'web3-utils';
import cn from 'classnames';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { IColumn, Table } from '../../../components/Table';
import { useStores } from '../../../stores';
import LinkBitcoin from '../../../components/LinkBitcoin';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import {
  satoshiToBitcoin,
  btcAddressHexToBech32,
} from '../../../services/bitcoin';
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import { IIssue } from '../../../modules/dashboard/dashboardTypes';
import { dateFormat } from '../../../utils';
import { LinkHarmony } from '../../../components/LinkHarmony';

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

  const columns: IColumn<IIssue>[] = [
    {
      title: 'Date',
      width: 150,
      className: s.column,
      key: 'id',
      render: value => {
        return <div>{dateFormat(new Date(Number(value.opentime) * 1000))}</div>;
      },
    },
    {
      title: 'Amount',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        const amount = utils.toBN(value.amount);
        const fee = utils.toBN(value.fee);
        return <div>{satoshiToBitcoin(amount.add(fee).toString())} BTC</div>;
      },
    },
    {
      title: 'Vault Account',
      className: cn(s.column, s.columnAddress),
      key: 'id',
      width: '33',
      render: value => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkHarmony hash={value.vault} type="address" />
          </div>
        );
      },
    },
    {
      title: 'Vault BTC Address',
      className: cn(s.column, s.columnAddress),
      key: 'id',
      width: '33',
      render: value => {
        return (
          <div onClick={e => e.stopPropagation()}>
            <LinkBitcoin
              hash={btcAddressHexToBech32(value.btcAddress)}
              type="wallet"
            />
          </div>
        );
      },
    },
    {
      title: 'Status',
      className: s.column,
      key: 'id',
      width: '33',
      render: value => {
        return <EntityStatus status={value.status} />;
      },
    },
  ];

  return (
    <Table
      columns={columns}
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
