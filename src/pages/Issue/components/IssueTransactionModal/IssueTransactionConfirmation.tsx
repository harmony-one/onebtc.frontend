import React, { useCallback } from 'react';
import { Box } from 'grommet';
import { Button, Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoinTx from '../../../../components/LinkBitcoinTx';
import { BcoinBTCTx } from '../../../../services/bitcoin';
import * as styles from './IssueTransactionConfirmation.styl';
import { useStores } from '../../../../stores';

interface IssueTransactionConfirmationProps {
  btcTx: BcoinBTCTx;
  issueTxHash: string;
}

export const IssueTransactionConfirmation: React.FC<IssueTransactionConfirmationProps> = ({
  btcTx,
  issueTxHash,
}) => {
  const { issuePageStore } = useStores();
  const CONFIRMATIONS = 1;
  const isConfirmed = btcTx.confirmations >= CONFIRMATIONS;
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
        <Box className={styles.circle}>
          <Text>
            Confirmations: {btcTx.confirmations}/{CONFIRMATIONS}
          </Text>
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
      {isConfirmed && (
        <Box>
          <Button bgColor="#00ADE8" onClick={handleClaim}>
            Claim oneBTC
          </Button>
        </Box>
      )}
    </Box>
  );
};

IssueTransactionConfirmation.displayName = 'IssueTransactionConfirmation';
