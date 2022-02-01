import React from 'react';
import { Box } from 'grommet';
import { Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModals.styl';
import { StatusCritical } from 'grommet-icons';
import cn from 'classnames';

interface Props {
  redeemId: string;
}

export const RedeemDetailsModalCanceled: React.FC<Props> = () => {
  return (
    <Box align="center" gap="small">
      <Box>
        <Title>Redeem canceled</Title>
      </Box>

      <Box className={cn(styles.circle, styles.circleCanceled)}>
        <StatusCritical size="xlarge" color="white" />
      </Box>
    </Box>
  );
};

RedeemDetailsModalCanceled.displayName = 'RedeemDetailsModalCanceled';
