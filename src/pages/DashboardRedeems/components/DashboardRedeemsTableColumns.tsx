import React from 'react';
import { IColumn } from '../../../components/Table';
import { IRedeem } from '../../../modules/dashboard/dashboardTypes';
import cn from 'classnames';
import * as s from '../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { LinkHarmony } from '../../../components/LinkHarmony';
import LinkBitcoin from '../../../components/LinkBitcoin';
import {
  satoshiToBitcoin,
  btcAddressHexToBech32,
} from '../../../services/bitcoin';
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import { dateTimeAgoFormat } from '../../../utils';

export const DashboardRedeemsTableColumns: IColumn<IRedeem>[] = [
  {
    title: 'Vault Account',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: IRedeem) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkHarmony hash={value.vault} type="address" />
        </div>
      );
    },
  },
  {
    title: 'Output BTC Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: IRedeem) => {
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
    render: (value: IRedeem) => {
      return <EntityStatus status={value.status} />;
    },
  },
  {
    title: 'Amount',
    className: s.column,
    key: 'id',
    width: '33',
    render: (value: IRedeem) => {
      return <div>{satoshiToBitcoin(value.amountBtc)} BTC</div>;
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
