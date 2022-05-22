import React from 'react';
import { Box } from 'grommet';
import { Text, Title } from '../../../../components/Base';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { config } from '../../../../config';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModals.styl';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { useStores } from '../../../../stores';

export const RedeemDetailsModalWaitTransaction: React.FC<{
  redeemId: string;
}> = ({ redeemId }) => {
  const { redeemStore } = useStores();

  const redeemInfo = redeemStore.getRedeemInfo(redeemId);

  if (!redeemInfo || !redeemInfo.btcTx) {
    return null;
  }

  return (
    <Box gap="small" align="center">
      <Box>
        <Title>Pending</Title>
      </Box>
      <Box className={styles.circleBorder} align="center">
        <SpinnerContainer boxSize={32}>
          <Text inline style={{ textAlign: 'center' }}>
            Waiting confirmations: {redeemInfo.btcTx.confirmations}/
            {config.bitcoin.waitConfirmationsCount}
          </Text>
        </SpinnerContainer>
      </Box>
      <Box>
        <Text>BTC Transaction:</Text>
      </Box>
      <Box>
        <LinkBitcoin
          hash={redeemInfo.btcTx.hash}
          type="tx"
          text={redeemInfo.btcTx.hash}
        />
      </Box>
    </Box>
  );
};

RedeemDetailsModalWaitTransaction.displayName =
  'RedeemDetailsModalWaitTransaction';
