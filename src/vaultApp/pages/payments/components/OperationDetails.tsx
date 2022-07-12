import React from 'react';
import {
  Operation,
  OperationAction,
} from '../../../modules/vaultClient/VaultClient';
import { Box } from 'grommet';
import { LinkHarmony } from '../../../../components/LinkHarmony';
import { dateTimeAgoFormat } from '../../../../utils';
import { Text } from '../../../../components/Base';
import * as s from './OperationDetails.styl';
import { OperationActionStatus } from '../../../components/OperationActionStatus';
import LinkBitcoin from '../../../../components/LinkBitcoin';

interface OperationActionTxLinkProps {
  action: OperationAction;
}

const OperationActionTxLink: React.FC<OperationActionTxLinkProps> = ({
  action,
}: {
  action: OperationAction;
}) => {
  if (action.type === 'transferBTC' || action.type === 'waitingConfirmations') {
    return <LinkBitcoin hash={action.transactionHash} type="tx" />;
  }

  return <LinkHarmony hash={action.transactionHash} type="tx" />;
};

interface OperationActionProps {
  action: OperationAction;
}

const OperationAction: React.FC<OperationActionProps> = ({ action }) => {
  return (
    <Box
      direction="row"
      gap="xsmall"
      margin={{ left: 'medium', top: 'small' }}
      key={action.id}
    >
      <Box basis="xsmall">
        <div className={s.tree} />
      </Box>
      <Box basis="full">
        <Text>{action.type}</Text>
      </Box>
      <Box basis="full">
        <OperationActionStatus action={action} />
      </Box>
      <Box basis="full">
        {action.transactionHash && <OperationActionTxLink action={action} />}
        {action.error && <Text>{action.error}</Text>}
      </Box>
      <Box basis="full">
        {action.timestamp && dateTimeAgoFormat(action.timestamp * 1000)}
      </Box>
    </Box>
  );
};

interface Props {
  data: Operation;
}

export const OperationDetails: React.FC<Props> = ({ data }) => {
  return (
    <Box direction="column" pad={{ bottom: 'small', left: 'small' }}>
      {data.actions.map(action => (
        <OperationAction action={action} />
      ))}
    </Box>
  );
};

OperationDetails.displayName = 'OperationDetails';
