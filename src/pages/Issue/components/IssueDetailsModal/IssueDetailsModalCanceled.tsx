import React from 'react';
import { Box } from 'grommet';
import { Title } from '../../../../components/Base';
import * as styles from './IssueDetailsModals.styl';
import { StatusCritical } from 'grommet-icons';
import cn from 'classnames';

interface Props {
  issueId: string;
}

export const IssueDetailsModalCanceled: React.FC<Props> = () => {
  return (
    <Box align="center" gap="small">
      <Box>
        <Title>Issue canceled</Title>
      </Box>

      <Box className={cn(styles.circle, styles.circleCanceled)}>
        <StatusCritical size="xlarge" color="white" />
      </Box>
    </Box>
  );
};

IssueDetailsModalCanceled.displayName = 'IssueDetailsModalCanceled';
