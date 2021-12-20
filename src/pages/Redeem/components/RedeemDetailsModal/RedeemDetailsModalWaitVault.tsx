import React, { useCallback } from 'react';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Text, Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModals.styl';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { useStores } from '../../../../stores';

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
      {redeemInfo.isExpired && !redeemInfo.isCanceled && (
        <Box>
          <Button onClick={handleCancelRedeem}>Cancel Redeem</Button>
        </Box>
      )}
    </Box>
  ));
};

RedeemDetailsModalWaitVault.displayName = 'RedeemDetailsModalWaitVault';
