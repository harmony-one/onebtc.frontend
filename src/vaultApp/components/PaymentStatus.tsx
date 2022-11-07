import React from 'react';
import { Operation } from '../modules/vaultClient/VaultClient';
import {
  StatusCompleted,
  StatusError,
  StatusPending,
} from '../../components/Dashboard/EntityStatus';

enum TX_TYPE {
  // correct
  ISSUE = 'ISSUE',
  REDEEM = 'REDEEM',
  WRONG_PAYMENT_RETURN = 'WRONG_PAYMENT_RETURN',

  // can be returned
  ISSUE_DUPLICATE = 'ISSUE_DUPLICATE',
  WRONG_PAYMENT = 'WRONG_PAYMENT',

  // alarm
  REDEEM_DUPLICATE = 'REDEEM_DUPLICATE',
  THEFT_OF_FUNDS = 'THEFT_OF_FUNDS',
}

interface Props {
  operation: {
    type: TX_TYPE,
    alreadyReturned: boolean
  };
}

const names = {
  [TX_TYPE.ISSUE]: 'Issue',
  [TX_TYPE.REDEEM]: 'Redeem',
  [TX_TYPE.WRONG_PAYMENT_RETURN]: 'Return pay',
  [TX_TYPE.ISSUE_DUPLICATE]: 'Duplicate',
  [TX_TYPE.WRONG_PAYMENT]: 'Wrong pay',
  [TX_TYPE.REDEEM_DUPLICATE]: 'Duplicate',
  [TX_TYPE.THEFT_OF_FUNDS]: 'Theft',
}

export const PaymentStatus: React.FC<Props> = React.memo(({ operation }) => {
  switch(operation.type) {
    case TX_TYPE.ISSUE:
    case TX_TYPE.REDEEM: 
    case TX_TYPE.WRONG_PAYMENT_RETURN:
      return <StatusCompleted label={names[operation.type]} />;  

    case TX_TYPE.ISSUE_DUPLICATE:
      return <StatusPending label={names[operation.type]} />;
    case TX_TYPE.WRONG_PAYMENT: 
      return operation.alreadyReturned ? 
      <StatusCompleted label={names[operation.type]} />:
      <StatusPending label={names[operation.type]} />;

    case TX_TYPE.REDEEM_DUPLICATE:
    case TX_TYPE.THEFT_OF_FUNDS:  
      return <StatusError label={names[operation.type]} />;
  }
});

PaymentStatus.displayName = 'PaymentStatus';
