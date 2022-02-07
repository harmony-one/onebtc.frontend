import React, { useCallback } from 'react';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Text, Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModals.styl';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { useStores } from '../../../../stores';
import { RedeemExtendedStatus } from '../../../../stores/RedeemStore';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';

export const RedeemDetailsModalWaitVault: React.FC<{ redeemId: string }> = ({
  redeemId,
}) => {
  const { redeemStore, redeemPageStore } = useStores();
  const redeemInfo = redeemStore.getRedeemInfo(redeemId);
  const handleCancelRedeem = useCallback(() => {
    redeemPageStore.cancelIssue(redeemId);
  }, [redeemId, redeemPageStore]);

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box>
        <Title>Pending</Title>
      </Box>
      <Box className={styles.circleBorder} justify="center" align="center">
        <SpinnerContainer boxSize={32}>
          <Text inline bold style={{ textAlign: 'center' }}>
            Waiting for Vault
          </Text>
        </SpinnerContainer>
      </Box>
      <Box>
        {redeemInfo.extendedStatus ===
          RedeemExtendedStatus.WAIT_BTC_TRANSACTION && (
          <Text>Waiting BTC transaction</Text>
        )}
        {redeemInfo.extendedStatus === RedeemExtendedStatus.WAIT_EXECUTE && (
          <Text>Waiting for execute</Text>
        )}
      </Box>
      {redeemInfo.btcTx && (
        <>
          <Box>
            <Text>BTC Transaction: {cutText(redeemInfo.btcTx.hash)}</Text>
          </Box>
          <Box>
            <LinkBitcoin
              type="tx"
              hash={redeemInfo.btcTx.hash}
              text="View on explorer"
            />
          </Box>
        </>
      )}
      {redeemInfo.isExpired && !redeemInfo.isCanceled && (
        <Box>
          <Button onClick={handleCancelRedeem}>Cancel Redeem</Button>
        </Box>
      )}
    </Box>
  ));
};

RedeemDetailsModalWaitVault.displayName = 'RedeemDetailsModalWaitVault';
