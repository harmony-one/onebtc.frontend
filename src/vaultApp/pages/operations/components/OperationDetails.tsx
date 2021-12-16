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

interface OperationActionProps {
  action: OperationAction;
}

const OperationAction: React.FC<OperationActionProps> = ({ action }) => {
  return (
    <Box direction="row" gap="xsmall" margin={{ top: 'small' }} key={action.id}>
      <Box>
        <div className={s.tree} />
      </Box>
      <Box width="200px">
        <Text>{action.type}</Text>
      </Box>
      <Box width="120px">
        <OperationActionStatus action={action} />
      </Box>
      <Box width="200px">
        {action.transactionHash && (
          <LinkHarmony hash={action.transactionHash} type="tx" />
        )}
        {action.error && <Text>{action.error}</Text>}
      </Box>
      <Box width="200px">{dateTimeAgoFormat(action.timestamp)}</Box>
      {/*<Box>*/}
      {/*  {action.payload && (*/}
      {/*    <LinkHarmony hash={action.payload.transactionHash} type="tx" />*/}
      {/*  )}*/}
      {/*</Box>*/}
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
