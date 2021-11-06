import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { Button, Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import * as styles from './IssueDetailsModalConfirmation.styl';
import { useStores } from '../../../../stores';
import { config } from '../../../../config';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';

interface Props {
  issueId: string;
}

export const IssueDetailsModalConfirmation: React.FC<Props> = ({ issueId }) => {
  const { issueStore, issuePageStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  const title = issueInfo.isConfirmedBtcTX ? 'Confirmed' : 'Received';

  const handleClaim = useCallback(() => {
    issuePageStore.executeIssue(issueId, issueInfo.btcTx.hash);
  }, [issueId, issueInfo.btcTx.hash, issuePageStore]);

  return (
    <Box align="center" gap="small">
      <Box>
        <Title>{title}</Title>
      </Box>
      {!issueInfo.isConfirmedBtcTX && (
        <Box className={styles.circleBorder} align="center">
          <SpinnerContainer boxSize={32}>
            <Text inline style={{ textAlign: 'center' }}>
              Waiting confirmations: {issueInfo.btcTx.confirmations}/
              {config.bitcoin.waitConfirmations}
            </Text>
          </SpinnerContainer>
        </Box>
      )}
      {issueInfo.isConfirmedBtcTX && (
        <Box className={styles.circle}>
          <Checkmark size="xlarge" color="white" />
        </Box>
      )}
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
      {!issueInfo.isCompleted && issueInfo.isConfirmedBtcTX && (
        <Box>
          <Text>
            Your BTC transaction successfully confirmed. Please Execute issue to
            receive your 1BTC on Harmony side.
          </Text>
        </Box>
      )}
      {!issueInfo.isCompleted && (
        <Box>
          <Button
            bgColor="#46d7b6"
            disabled={!issueInfo.isConfirmedBtcTX}
            onClick={handleClaim}
          >
            Execute issue
          </Button>
        </Box>
      )}
      {!issueInfo.isConfirmedBtcTX && (
        <Box>
          <Text>
            <Text inline bold color="Red">
              Note:
            </Text>{' '}
            BTC confirmations could take up to 1 hour to complete. Please be
            patient.
          </Text>
        </Box>
      )}
    </Box>
  );
};

IssueDetailsModalConfirmation.displayName = 'IssueDetailsModalConfirmation';
