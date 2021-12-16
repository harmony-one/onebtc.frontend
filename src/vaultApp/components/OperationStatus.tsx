import React from 'react';
import { Operation } from '../modules/vaultClient/VaultClient';
import {
  StatusCompleted,
  StatusError,
  StatusPending,
} from '../../components/Dashboard/EntityStatus';

interface Props {
  operation: Operation;
}

export const OperationStatus: React.FC<Props> = React.memo(({ operation }) => {
  if (operation.status === 'in_progress') {
    return <StatusPending label="in progress" />;
  }

  if (operation.status === 'error') {
    return <StatusError label="error" />;
  }

  if (operation.status === 'success') {
    return <StatusCompleted label="success" />;
  }

  return <StatusError />;
});

OperationStatus.displayName = 'OperationStatus';
