import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { Button, Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoinTx from '../../../../components/LinkBitcoinTx';
import { BcoinBTCTx } from '../../../../services/bitcoin';
import * as styles from './IssueTransactionConfirmation.styl';
import { useStores } from '../../../../stores';
import { config } from '../../../../config';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { useIssueStatusWatcher } from '../../../../hooks/useIssueStatusWatcher';

interface IssueTransactionConfirmationProps {
  btcTx: BcoinBTCTx;
  issueTxHash: string;
}

export const IssueTransactionConfirmation: React.FC<IssueTransactionConfirmationProps> = ({
  btcTx,
  issueTxHash,
}) => {
  const { issuePageStore, user } = useStores();
  const isConfirmed = btcTx.confirmations >= config.bitcoin.waitConfirmations;
  const title = isConfirmed ? 'Confirmed' : 'Received';
  const issue = issuePageStore.issuesMap[issueTxHash];

  const handleClaim = useCallback(() => {
    issuePageStore.executeIssue(issueTxHash, btcTx.hash);
  }, [btcTx.hash, issuePageStore, issueTxHash]);

  const status = useIssueStatusWatcher({
    oneBtcClient: user.oneBtcClient,
    issueId: issue.issueEvent.issue_id,
    requester: issue.issueEvent.requester,
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
        <LinkBitcoinTx txHash={btcTx.hash} text="View on explorer" />
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

IssueTransactionConfirmation.displayName = 'IssueTransactionConfirmation';
