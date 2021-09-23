import React, { useCallback } from 'react';
import { useStores } from '../../../../stores';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Text, Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueTransactionModal/IssueTransactionConfirmation.styl';
import { cutText } from '../../../../services/cutText';
import LinkBitcoinTx from '../../../../components/LinkBitcoinTx';
import { Checkmark } from 'grommet-icons';
import { BcoinBTCTx } from '../../../../services/bitcoin';

export const RedeemDetailsModalConfirmation: React.FC<{
  redeemTxHash: string;
  btcTx: BcoinBTCTx;
}> = ({ redeemTxHash, btcTx }) => {
  const { redeemPageStore } = useStores();

  const redeemInfo = redeemPageStore.getRedeemInfo(redeemTxHash);

  const handleExecuteRedeem = useCallback(() => {
    redeemPageStore.executeRedeem(redeemTxHash, btcTx.hash);
  }, [btcTx.hash, redeemPageStore, redeemTxHash]);

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
        <LinkBitcoinTx txHash={btcTx.hash} text="View on explorer" />
      </Box>
      <Box>
        <Text>
          BTC transaction successfully confirmed. Please Execute redeem to
          unlock your OneBTC.
        </Text>
      </Box>

      <Box>
        <Button
          bgColor="#46d7b6"
          disabled={false}
          onClick={handleExecuteRedeem}
        >
          Execute redeem
        </Button>
      </Box>
    </Box>
  ));
};

RedeemDetailsModalConfirmation.displayName = 'RedeemDetailsModalConfirmation';
