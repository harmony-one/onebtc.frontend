import React from 'react';
import { IssueStatus, RedeemStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';
import {
  Clock,
  StatusCritical,
  StatusGood,
  StatusWarning,
} from 'grommet-icons';
import { Box } from 'grommet';
import { Text } from 'components/Base';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { IIssue, IRedeem } from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { IssueExtendedStatus } from '../../stores/IssueStore';
import { RedeemExtendedStatus } from '../../stores/RedeemStore';

interface Props {
  status: IssueStatus | RedeemStatus;
}

const boxProps = {
  direction: 'row',
  align: 'center',
  gap: 'xxsmall',
} as const;

export const StatusError: React.FC<{ label?: string }> = ({ label }) => {
  const text = label || 'Error';
  return (
    <Box {...boxProps}>
      <StatusWarning color="Red" />
      <Text color="Red">{text}</Text>
    </Box>
  );
};

StatusError.displayName = 'StatusError';

export const StatusPending: React.FC<{ label?: string }> = ({ label }) => {
  const text = label || 'Pending';
  return (
    <Box {...boxProps}>
      <Clock color="Orange" />
      <Text color="Orange500">{text}</Text>
    </Box>
  );
};

StatusPending.displayName = 'StatusPending';

export const StatusCanceled: React.FC<{ label?: string }> = ({ label }) => {
  const text = label || 'Canceled';
  return (
    <Box {...boxProps}>
      <StatusCritical color="Gray" />
      <Text color="Gray">{text}</Text>
    </Box>
  );
};

StatusCanceled.displayName = 'StatusCanceled';

export const StatusCompleted: React.FC<{ label?: string }> = ({ label }) => {
  const text = label || 'Completed';
  return (
    <Box {...boxProps}>
      <StatusGood color="Green" />
      <Text color="Green">{text}</Text>
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

interface IssueExtendedStatusProps {
  issue: IIssue;
}

export const IssueStatusExtended: React.FC<IssueExtendedStatusProps> = observer(
  ({ issue }) => {
    const { issueStore } = useStores();

    const status = issueStore.getIssueExtendedStatus(issue);

    if (status === IssueExtendedStatus.COMPLETED) {
      return <StatusCompleted />;
    }

    if (status === IssueExtendedStatus.CANCELED) {
      return <StatusCanceled />;
    }

    if (status === IssueExtendedStatus.WAIT_EXECUTE) {
      return <StatusPending label="Waiting for execute" />;
    }

    if (status === IssueExtendedStatus.WAIT_BTC_CONFIRMATION) {
      return <StatusPending label="Waiting for confirmation" />;
    }

    if (status === IssueExtendedStatus.WAIT_BTC_TRANSACTION) {
      return <StatusPending label="Waiting for transaction" />;
    }

    return <StatusError />;
  },
);

interface RedeemExtendedStatusProps {
  redeem: IRedeem;
}

export const RedeemStatusExtended: React.FC<RedeemExtendedStatusProps> = observer(
  ({ redeem }) => {
    const { redeemStore } = useStores();

    const status = redeemStore.getRedeemExtendedStatus(redeem);

    if (status === RedeemExtendedStatus.COMPLETED) {
      return <StatusCompleted />;
    }

    if (status === RedeemExtendedStatus.CANCELED) {
      return <StatusCanceled />;
    }

    if (status === RedeemExtendedStatus.WAIT_EXECUTE) {
      return <StatusPending label="Waiting for execute" />;
    }

    if (status === RedeemExtendedStatus.WAIT_BTC_CONFIRMATION) {
      return <StatusPending label="Waiting for confirmation" />;
    }

    if (status === RedeemExtendedStatus.WAIT_BTC_TRANSACTION) {
      return <StatusPending label="Waiting for transaction" />;
    }

    return <StatusError />;
  },
);
