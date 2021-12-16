import React from 'react';
import { OperationAction } from '../modules/vaultClient/VaultClient';
import {
  StatusCompleted,
  StatusError,
  StatusPending,
} from '../../components/Dashboard/EntityStatus';

interface Props {
  action: OperationAction;
}

export const OperationActionStatus: React.FC<Props> = React.memo(
  ({ action }) => {
    if (action.status === 'waiting') {
      return <StatusPending label="waiting" />;
    }

    if (action.status === 'error') {
      return <StatusError label="error" />;
    }

    if (action.status === 'success') {
      return <StatusCompleted label="success" />;
    }

    return <StatusError />;
  },
);

OperationActionStatus.displayName = 'OperationStatus';
