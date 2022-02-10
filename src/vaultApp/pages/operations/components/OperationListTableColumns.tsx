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
import { Operation, vaultClient } from '../../../modules/vaultClient/VaultClient';
import { OperationStatus } from '../../../components/OperationStatus';
import { Button, Title } from 'components/Base';
import { Box } from 'grommet';
import stores from 'stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';

export const getOperationListTableColumns = (operationListStore: ListStoreConstructor<Operation>): IColumn<Operation>[] => [
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
  {
    title: 'Manage',
    width: '33',
    className: s.column,
    key: 'id',
    render: (value: Operation) => {
      return value.status === 'error' ? 
        <Button 
          onClick={() => {
            vaultClient.restartOperation(value.id)
              .then(async () => {
                await operationListStore.fetch();
                return stores.actionModals.open(
                  () => <Box pad="large">
                    <Title>Operation succefully restarted</Title>
                  </Box>, 
                  {
                    applyText: 'Ok',
                    noValidation: true,
                    width: '400px',
                    showOther: true,
                    onApply: () => {
                      return Promise.resolve();
                    },
                    onClose: () => {
                      return Promise.resolve();
                    },
                });  
              })
              .catch((e) => alert(e))
          }}
        >
          Restart
        </Button> 
        : null;
    },
  },
];
