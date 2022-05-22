import React from 'react';
import { Text } from '../../../components/Base';
import { IColumn } from '../../../components/Table';
import { IIssue } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import cn from 'classnames';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { LinkHarmony } from '../../../components/LinkHarmony';
import LinkBitcoin from '../../../components/LinkBitcoin';
import {
  satoshiToBitcoin,
  btcAddressHexToBech32,
} from '../../../services/bitcoin';
import { IssueStatusExtended } from '../../../components/Dashboard/EntityStatus';
import utils from 'web3-utils';
import { dateTimeAgoFormat, formatWithEightDecimals } from '../../../utils';

export const DashboardIssueTableColumns: IColumn<IIssue>[] = [
  {
    title: 'Vault Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    dataIndex: 'vault',
    sortable: true,
    render: (value, issue) => {
      const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
      };

      return (
        <LinkHarmony
          href={`/dashboard/vaults/${issue.vault}`}
          onClick={handleClick}
          hash={issue.vault}
          type="address"
        />
      );
    },
  },
  {
    title: 'Vault BTC Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    dataIndex: 'btcAddress',
    sortable: true,
    render: (value, issue) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkBitcoin
            hash={btcAddressHexToBech32(issue.btcAddress)}
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
    dataIndex: 'status',
    sortable: true,
    render: (value, issue) => {
      return <IssueStatusExtended issue={issue} />;
    },
  },
  {
    title: 'Amount',
    className: s.column,
    key: 'id',
    width: '33',
    dataIndex: 'amount',
    sortable: true,
    render: (value, issue) => {
      const amount = utils.toBN(issue.amount);
      const fee = utils.toBN(issue.fee);
      const totalAmount = amount.add(fee).toString();
      const totalBtcAmount = satoshiToBitcoin(totalAmount);
      return <Text>{formatWithEightDecimals(totalBtcAmount)} 1BTC</Text>;
    },
  },
  {
    title: 'Date',
    width: '33',
    className: s.column,
    key: 'id',
    render: value => {
      return <Text>{dateTimeAgoFormat(Number(value.opentime) * 1000)}</Text>;
    },
  },
];
