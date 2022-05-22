import React from 'react';
import { Box } from 'grommet';
import { Text, Title } from '../../../../components/Base';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import * as styles from './IssueDetailsModals.styl';
import { useStores } from '../../../../stores';
import { config } from '../../../../config';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';

interface Props {
  issueId: string;
}

export const IssueDetailsModalWaitBtcTxConfirmation: React.FC<Props> = ({
  issueId,
}) => {
  const { issueStore } = useStores();
  const issueInfo = issueStore.getIssueInfo(issueId);

  return (
    <Box align="center" gap="small">
      <Box>
        <Title>Received</Title>
      </Box>

      <Box className={styles.circleBorder} align="center">
        <SpinnerContainer boxSize={32}>
          <Text inline style={{ textAlign: 'center' }}>
            Waiting confirmations: {issueInfo.btcTx.confirmations}/
            {config.bitcoin.waitConfirmationsCount}
          </Text>
        </SpinnerContainer>
      </Box>
      <Box>
        <Text>BTC Transaction:</Text>
      </Box>
      <Box>
        <LinkBitcoin
          hash={issueInfo.btcTx.hash}
          type="tx"
          text={issueInfo.btcTx.hash}
        />
      </Box>
      <Box>
        <Text>
          <Text inline bold color="Red">
            Note:
          </Text>{' '}
          BTC confirmations could take up to 1 hour to complete. Please be
          patient.
        </Text>
      </Box>
    </Box>
  );
};

IssueDetailsModalWaitBtcTxConfirmation.displayName =
  'IssueDetailsModalWaitBtcTxConfirmation';
