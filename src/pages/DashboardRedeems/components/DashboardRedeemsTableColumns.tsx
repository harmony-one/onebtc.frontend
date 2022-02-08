import React from 'react';
import { IColumn } from '../../../components/Table';
import { IRedeem } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import cn from 'classnames';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { LinkHarmony } from '../../../components/LinkHarmony';
import LinkBitcoin from '../../../components/LinkBitcoin';
import {
  satoshiToBitcoin,
  btcAddressHexToBech32,
} from '../../../services/bitcoin';
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import { dateTimeAgoFormat, formatWithTenDecimals } from '../../../utils';

export const DashboardRedeemsTableColumns: IColumn<IRedeem>[] = [
  {
    title: 'Vault Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    dataIndex: 'vault',
    sortable: true,
    render: (value, redeem) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkHarmony hash={redeem.vault} type="address" />
        </div>
      );
    },
  },
  {
    title: 'Output BTC Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    dataIndex: 'btcAddress',
    sortable: true,
    render: (value, redeem) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkBitcoin
            hash={btcAddressHexToBech32(redeem.btcAddress)}
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
    render: (value, redeem) => {
      return <EntityStatus status={redeem.status} />;
    },
  },
  {
    title: 'Amount',
    className: s.column,
    key: 'id',
    width: '33',
    dataIndex: 'amountBtc',
    sortable: true,
    render: (value, redeem) => {
      const amountBtc = satoshiToBitcoin(redeem.amountBtc);
      return <div>{formatWithTenDecimals(amountBtc)} BTC</div>;
    },
  },
  {
    title: 'Date',
    width: '33',
    className: s.column,
    key: 'id',
    render: (value: IRedeem) => {
      return <div>{dateTimeAgoFormat(Number(value.opentime) * 1000)}</div>;
    },
  },
];
