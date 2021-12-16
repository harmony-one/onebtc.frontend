import React from 'react';
import { IColumn } from '../../../../components/Table';
import cn from 'classnames';
import * as s from '../../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { Text } from '../../../../components/Base';
import { LinkHarmony } from '../../../../components/LinkHarmony';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import {
  btcAddressHexToBech32,
  satoshiToBitcoin,
} from '../../../../services/bitcoin';
import { dateTimeAgoFormat, formatWithTenDecimals } from '../../../../utils';
import { Operation } from '../../../modules/vaultClient/VaultClient';
import { OperationStatus } from '../../../components/OperationStatus';

export const OperationListTableColumns: IColumn<Operation>[] = [
  {
    title: 'Vault Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: Operation) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkHarmony hash={value.vault} type="address" />
        </div>
      );
    },
  },
  {
    title: 'Type',
    className: cn(s.column),
    key: 'id',
    width: '33',
    render: (value: Operation) => {
      return <Text>{value.type}</Text>;
    },
  },
  {
    title: 'Output BTC Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: Operation) => {
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
    render: (value: Operation) => {
      return <OperationStatus operation={value} />;
    },
  },
  {
    title: 'Amount',
    className: s.column,
    key: 'id',
    width: '33',
    render: (value: Operation) => {
      const amountBtc = satoshiToBitcoin(value.amount);
      return <div>{formatWithTenDecimals(amountBtc)} 1BTC</div>;
    },
  },
  {
    title: 'Date',
    width: '33',
    className: s.column,
    key: 'id',
    render: (value: Operation) => {
      return <div>{dateTimeAgoFormat(Number(value.timestamp) * 1000)}</div>;
    },
  },
];
