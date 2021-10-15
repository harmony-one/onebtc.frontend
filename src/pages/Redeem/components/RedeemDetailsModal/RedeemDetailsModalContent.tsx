import React from 'react';
import { useStores } from '../../../../stores';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { RedeemDetailsModalTransaction } from './RedeemDetailsModalTransaction';
import { RedeemDetailsModalConfirmation } from './RedeemDetailsModalConfirmation';
import { RedeemDetailsModalWaitVault } from './RedeemDetailsModalWaitVault';
import { RedeemDetailsModalWaitTransaction } from './RedeemDetailsModalWaitTransaction';
import { useRedeemWatcher } from '../../../../hooks/useRedeemWatcher';

interface Props {
  redeemId: string;
}

export const RedeemDetailsModalContent: React.FC<Props> = ({ redeemId }) => {
  const { redeemStore } = useStores();
  const redeemInfo = redeemStore.getRedeemInfo(redeemId);

  useRedeemWatcher({ redeemId });

  return (
    <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
      <Text style={{ overflowWrap: 'break-word', textAlign: 'center' }}>
        Redeem # {redeemInfo.redeemId}
      </Text>
      <Divider fullwidth colorful />
      <Box direction="row-responsive" gap="medium" basis="full" align="start">
        <Box basis="1/2">
          <RedeemDetailsModalTransaction redeemId={redeemId} />
        </Box>
        <Box basis="1/2" gap="medium" align="center">
          {!redeemInfo.btcTx && <RedeemDetailsModalWaitVault />}
          {redeemInfo.btcTx &&
            !redeemInfo.isConfirmedBtcTX &&
            !redeemInfo.isCompleted && (
              <RedeemDetailsModalWaitTransaction redeemId={redeemId} />
            )}
          {redeemInfo.btcTx && redeemInfo.isCompleted && (
            <RedeemDetailsModalConfirmation redeemId={redeemId} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

RedeemDetailsModalContent.displayName = 'RedeemDetailsModalContent';
