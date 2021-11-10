import React from 'react';
import { IssueStatus, RedeemStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';
import {
  Clock,
  StatusWarning,
  StatusCritical,
  StatusGood,
} from 'grommet-icons';
import { Box } from 'grommet';
import { Text } from 'components/Base';

interface Props {
  status: IssueStatus | RedeemStatus;
}

const boxProps = {
  direction: 'row',
  align: 'center',
  gap: 'xxsmall',
} as const;

export const StatusError: React.FC = () => {
  return (
    <Box {...boxProps}>
      <StatusWarning color="Red" />
      <Text color="Red">Error</Text>
    </Box>
  );
};

StatusError.displayName = 'StatusError';

export const StatusPending: React.FC = () => {
  return (
    <Box {...boxProps}>
      <Clock color="Orange" />
      <Text color="Orange500">Pending</Text>
    </Box>
  );
};

StatusPending.displayName = 'StatusPending';

export const StatusCanceled: React.FC = () => {
  return (
    <Box {...boxProps}>
      <StatusCritical color="Gray" />
      <Text color="Gray">Canceled</Text>
    </Box>
  );
};

StatusCanceled.displayName = 'StatusCanceled';

export const StatusCompleted: React.FC = () => {
  return (
    <Box {...boxProps}>
      <StatusGood color="Green" />
      <Text color="Green">Completed</Text>
    </Box>
  );
};

StatusCompleted.displayName = 'StatusCompleted';

export const EntityStatus: React.FC<Props> = ({ status }) => {
  if (status === RedeemStatus.COMPLETED) {
    return <StatusCompleted />;
  }

  if (status === RedeemStatus.PENDING) {
    return <StatusPending />;
  }

  if (status === RedeemStatus.CANCELED) {
    return <StatusCanceled />;
  }

  return <StatusError />;
};

EntityStatus.displayName = 'EntityStatus';
