import React from 'react';
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
import { EntityStatus } from '../../../components/Dashboard/EntityStatus';
import utils from 'web3-utils';
import { dateTimeAgoFormat } from '../../../utils';

export const DashboardIssueTableColumns: IColumn<IIssue>[] = [
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
  {
    title: 'Amount',
    className: s.column,
    key: 'id',
    width: '33',
    render: value => {
      const amount = utils.toBN(value.amount);
      const fee = utils.toBN(value.fee);
      return <div>{satoshiToBitcoin(amount.add(fee).toString())} 1BTC</div>;
    },
  },
  {
    title: 'Date',
    width: '33',
    className: s.column,
    key: 'id',
    render: value => {
      return <div>{dateTimeAgoFormat(Number(value.opentime) * 1000)}</div>;
    },
  },
];
