import React from 'react';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Text, Title } from '../../../../components/Base';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { config } from '../../../../config';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModalConfirmation.styl';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { BTCTransaction } from '../../../../modules/btcRelay/btcRelayTypes';

export const RedeemDetailsModalWaitTransaction: React.FC<{
  btcTx: BTCTransaction;
}> = ({ btcTx }) => {
  return useObserver(() => (
    <Box gap="small" align="center">
      <Box>
        <Title>Pending</Title>
      </Box>
      <Box className={styles.circleBorder} align="center">
        <SpinnerContainer boxSize={32}>
          <Text inline style={{ textAlign: 'center' }}>
            Waiting confirmations: {btcTx.confirmations}/
            {config.bitcoin.waitConfirmations}
          </Text>
        </SpinnerContainer>
      </Box>
      <Box>
        <Text>BTC Transaction: {cutText(btcTx.hash)}</Text>
      </Box>
      <Box>
        <LinkBitcoin hash={btcTx.hash} type="tx" text="View on explorer" />
      </Box>
    </Box>
  ));
};

RedeemDetailsModalWaitTransaction.displayName =
  'RedeemDetailsModalWaitTransaction';
