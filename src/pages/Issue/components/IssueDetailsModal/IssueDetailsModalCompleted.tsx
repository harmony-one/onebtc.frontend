import React from 'react';
import { Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import * as styles from './IssueDetailsModals.styl';
import { useStores } from '../../../../stores';
import cn from 'classnames';

interface Props {
  issueId: string;
}

export const IssueDetailsModalCompleted: React.FC<Props> = ({ issueId }) => {
  const { issueStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  return (
    <Box align="center" gap="small">
      <Box>
        <Title>Issue completed</Title>
      </Box>
      <Box className={cn(styles.circle, styles.circleConfirmed)}>
        <Checkmark size="xlarge" color="white" />
      </Box>
      <Box>
        <Text>BTC Transaction: {cutText(issueInfo.btcTx.hash)}</Text>
      </Box>
      <Box>
        <LinkBitcoin
          hash={issueInfo.btcTx.hash}
          type="tx"
          text="View on explorer"
        />
      </Box>
    </Box>
  );
};

IssueDetailsModalCompleted.displayName = 'IssueDetailsModalCompleted';
