import React, { useState } from 'react';
import { IColumn } from '../../../../components/Table';
import cn from 'classnames';
import * as s from '../../../../components/Table/Dashboard/DashboardTableStyles.styl';
import { Text } from '../../../../components/Base';
import { LinkHarmony } from '../../../../components/LinkHarmony';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import LinkDashboard from '../../../../components/LinkDashboard';
import {
  btcAddressHexToBech32,
  satoshiToBitcoin,
} from '../../../../services/bitcoin';
import { dateTimeAgoFormat, formatWithTenDecimals } from '../../../../utils';
import { Operation, vaultClient } from '../../../modules/vaultClient/VaultClient';
import { PaymentStatus } from '../../../components/PaymentStatus';
import { Button, Title, TextInput } from 'components/Base';
import { Box } from 'grommet';
import stores from 'stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';

export const getOperationListTableColumns = (operationListStore: ListStoreConstructor<Operation>): IColumn<Operation>[] => [
  {
    title: 'Issue',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: any) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkDashboard hash={value.issue} type="tx" />
        </div>
      );
    },
  },
  {
    title: 'Transaction',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: any) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkBitcoin hash={value.transactionHash} type="tx" />
        </div>
      );
    },
  },
  {
    title: 'BTC Address',
    className: cn(s.column, s.columnAddress),
    key: 'id',
    width: '33',
    render: (value: Operation) => {
      return (
        <div onClick={e => e.stopPropagation()}>
          <LinkBitcoin
            hash={value.btcAddress}
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
    render: (value: any) => {
      return <PaymentStatus operation={value} />;
    },
  },
  {
    title: 'Amount',
    className: s.column,
    key: 'id',
    width: '33',
    render: (value: Operation) => {
      const amountBtc = satoshiToBitcoin(value.amount);
      return <div>{formatWithTenDecimals(amountBtc)} BTC</div>;
    },
  },
  {
    title: 'Date',
    width: '30',
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
    render: (value: any) => {
      const amountBtc = satoshiToBitcoin(value.amount);

      return value.type === 'WRONG_PAYMENT' && !value.alreadyReturned ? 
        <Button 
          onClick={() => {
            vaultClient.returnBtcAddress = '';

            return stores.actionModals.open(
              () => <Box pad="large" gap="10px">
                <Title>Return "Wrong payment"</Title>
                <Text>You are planning to transfer {formatWithTenDecimals(amountBtc)} BTC from your vault account to an external account</Text>
                <Text>Important: Do this only if you have received a request from the support service or from a user who transferred the tokens by mistake. <br/>Otherwise, your vault may be liquidated for theft of funds.</Text>
                <Box margin={{ vertical: 'small' }}>
                  <Text>Enter receiver BTC address in bech32 format</Text>
                  <TextInput
                    name="bitcoinAddress"
                    type="string"
                    placeholder="Enter receiver bech32 BTC address"
                    style={{ width: '100%', marginTop: 10 }}
                    value={vaultClient.returnBtcAddress}
                    onChange={(v) => {
                      vaultClient.returnBtcAddress = v;
                    }}
                  />
                </Box>
              </Box>, 
              {
                applyText: 'Return BTC',
                closeText: 'Cancel',
                noValidation: true,
                width: '600px',
                showOther: true,
                onApply: () => {
                  return vaultClient.returnWrongPayment(value.id, vaultClient.returnBtcAddress)
                    .then(async () => {
                      await operationListStore.fetch();
                      return stores.actionModals.open(
                        () => <Box pad="large">
                          <Title>Return "Wrong payment" operation succefully created</Title>
                        </Box>, 
                        {
                          applyText: 'Ok',
                          noValidation: true,
                          width: '600px',
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
                },
                onClose: () => {
                  return Promise.resolve();
                },
            });  
          }}
        >
          Return
        </Button> 
        : null;
    },
  },
];
