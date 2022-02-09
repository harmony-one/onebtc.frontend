import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { Button, Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import * as styles from './IssueDetailsModals.styl';
import { useStores } from '../../../../stores';
import cn from 'classnames';

interface Props {
  issueId: string;
}

export const IssueDetailsModalWaitExecute: React.FC<Props> = ({ issueId }) => {
  const { issueStore, issuePageStore, btcRelayStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  const handleClaim = useCallback(() => {
    issuePageStore.executeIssue(issueId, issueInfo.btcTx.hash);
  }, [issueId, issueInfo.btcTx.hash, issuePageStore]);

  const isWaitingRelayer =
    !btcRelayStore.relayInfo || !btcRelayStore.relayInfo.synced;

  return (
    <Box align="center" gap="small">
      <Box>
        <Title>Waiting for execute</Title>
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
      <Box>
        <Text>
          Your BTC transaction successfully confirmed. Please Execute issue to
          receive your 1BTC on Harmony side.
        </Text>
      </Box>
      <Box align="center" gap="small">
        <Button
          bgColor="#46d7b6"
          disabled={!issueInfo.isConfirmedBtcTX || isWaitingRelayer}
          onClick={handleClaim}
        >
          Execute issue
        </Button>
        {isWaitingRelayer && (
          <Text bold>Waiting relayer synchronization...</Text>
        )}
      </Box>
    </Box>
  );
};

IssueDetailsModalWaitExecute.displayName = 'IssueDetailsModalWaitExecute';
