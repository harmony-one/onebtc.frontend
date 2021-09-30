import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { Button, Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { BcoinBTCTx } from '../../../../services/bitcoin';
import * as styles from './IssueDetailsModalConfirmation.styl';
import { useStores } from '../../../../stores';
import { config } from '../../../../config';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { useIssueStatusWatcher } from '../../../../hooks/useIssueStatusWatcher';

interface Props {
  btcTx: BcoinBTCTx;
  issueId: string;
}

export const IssueDetailsModalConfirmation: React.FC<Props> = ({
  btcTx,
  issueId,
}) => {
  const { issuePageStore } = useStores();
  const isConfirmed = btcTx.confirmations >= config.bitcoin.waitConfirmations;
  const title = isConfirmed ? 'Confirmed' : 'Received';

  const issueInfo = issuePageStore.getIssueInfo(issueId);

  const handleClaim = useCallback(() => {
    issuePageStore.executeIssue(issueId, btcTx.hash);
  }, [btcTx.hash, issuePageStore, issueId]);

  const status = useIssueStatusWatcher({
    issueId: issueInfo.issueId,
    requester: issueInfo.requester,
  });

  return (
    <Box align="center" gap="small">
      <Box>
        <Title>{title}</Title>
      </Box>
      {!isConfirmed && (
        <Box className={styles.circleBorder} align="center">
          <SpinnerContainer boxSize={32}>
            <Text inline style={{ textAlign: 'center' }}>
              Waiting confirmations: {btcTx.confirmations}/
              {config.bitcoin.waitConfirmations}
            </Text>
          </SpinnerContainer>
        </Box>
      )}
      {isConfirmed && (
        <Box className={styles.circle}>
          <Checkmark size="xlarge" color="white" />
        </Box>
      )}
      <Box>
        <Text>BTC Transaction: {cutText(btcTx.hash)}</Text>
      </Box>
      <Box>
        <LinkBitcoin hash={btcTx.hash} type="tx" text="View on explorer" />
      </Box>
      {isConfirmed && (
        <Box>
          <Text>
            Your BTC transaction successfully confirmed. Please Execute issue to
            receive your oneBTC on Harmony side.
          </Text>
        </Box>
      )}
      {status !== '2' && (
        <Box>
          <Button
            bgColor="#46d7b6"
            disabled={!isConfirmed}
            onClick={handleClaim}
          >
            Execute issue
          </Button>
        </Box>
      )}
    </Box>
  );
};

IssueDetailsModalConfirmation.displayName = 'IssueDetailsModalConfirmation';
