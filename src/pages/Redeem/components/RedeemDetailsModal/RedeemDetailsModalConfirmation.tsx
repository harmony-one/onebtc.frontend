import React from 'react';
import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Text, Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModalConfirmation.styl';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { Checkmark } from 'grommet-icons';
import { BcoinBTCTx } from '../../../../services/bitcoin';

export const RedeemDetailsModalConfirmation: React.FC<{
  redeemTxHash: string;
  btcTx: BcoinBTCTx;
}> = ({ redeemTxHash, btcTx }) => {
  const { redeemPageStore } = useStores();

  const redeemInfo = redeemPageStore.getRedeemInfo(redeemTxHash);

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box>
        <Title>Confirmed</Title>
      </Box>
      <Box>
        <Text bold>You have received {redeemInfo.totalReceived} BTC</Text>
      </Box>
      <Box className={styles.circle}>
        <Checkmark size="xlarge" color="white" />
      </Box>
      <Box>
        <Text>BTC Transaction: {cutText(btcTx.hash)}</Text>
      </Box>
      <Box>
        <LinkBitcoin type="tx" hash={btcTx.hash} text="View on explorer" />
      </Box>
    </Box>
  ));
};

RedeemDetailsModalConfirmation.displayName = 'RedeemDetailsModalConfirmation';
