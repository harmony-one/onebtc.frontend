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

interface IssueTransactionConfirmationProps {
  btcTx: BcoinBTCTx;
  issueTxHash: string;
}

export const IssueTransactionConfirmation: React.FC<IssueTransactionConfirmationProps> = ({
  btcTx,
  issueTxHash,
}) => {
  const { issuePageStore } = useStores();
  const isConfirmed = btcTx.confirmations >= config.bitcoin.waitConfirmations;
  const title = isConfirmed ? 'Confirmed' : 'Received';

  const handleClaim = useCallback(() => {
    issuePageStore.executeIssue(issueTxHash, btcTx.hash);
  }, [btcTx.hash, issuePageStore, issueTxHash]);

  return (
    <Box align="center" gap="small">
      <Box>
        <Title>{title}</Title>
      </Box>
      {!isConfirmed && (
        <Box className={styles.circleBorder}>
          <Text>
            Confirmations: {btcTx.confirmations}/
            {config.bitcoin.waitConfirmations}
          </Text>
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
            You will now receive your BTC backed oneBTC tokens. If this does not
            happen automatically within a few minutes, click the button bellow.
          </Text>
        </Box>
      )}
      <Box>
        <Button bgColor="#46d7b6" disabled={!isConfirmed} onClick={handleClaim}>
          Execute issue
        </Button>
      </Box>
    </Box>
  );
};

IssueTransactionConfirmation.displayName = 'IssueTransactionConfirmation';
