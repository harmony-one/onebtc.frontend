import React from 'react';
import { useStores } from '../../../../stores';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { RedeemDetailsModalTransaction } from './RedeemDetailsModalTransaction';
import { RedeemDetailsModalConfirmation } from './RedeemDetailsModalConfirmation';
import { RedeemDetailsModalWaitVault } from './RedeemDetailsModalWaitVault';
import { useBtcWalletIncomeWatcher } from '../../../../hooks/useBtcWalletIncomeWatcher';
import { useRedeemStatusWatcher } from '../../../../hooks/useRedeemStatusWatcher';
import { RedeemStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';
import { config } from '../../../../config';
import { RedeemDetailsModalWaitTransaction } from './RedeemDetailsModalWaitTransaction';

interface Props {
  redeemId: string;
}

export const RedeemDetailsModalContent: React.FC<Props> = ({ redeemId }) => {
  const { redeemPageStore } = useStores();

  const redeemInfo = redeemPageStore.getRedeemInfo(redeemId);
  const btcTx = useBtcWalletIncomeWatcher({
    redeemId,
    confirmations: 2,
  });

  const status = useRedeemStatusWatcher({
    redeemId: redeemInfo.redeemId,
    requester: redeemInfo.rawRedeem.requester,
  });

  const isCompleted = status === RedeemStatus.COMPLETED;
  const isConfirmed =
    btcTx && btcTx.confirmations >= config.bitcoin.waitConfirmations;

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
          {!btcTx && <RedeemDetailsModalWaitVault />}
          {!isCompleted && btcTx && !isConfirmed && (
            <RedeemDetailsModalWaitTransaction btcTx={btcTx} />
          )}
          {(isCompleted || isConfirmed) && (
            <RedeemDetailsModalConfirmation
              btcTx={btcTx}
              redeemTxHash={redeemId}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

RedeemDetailsModalContent.displayName = 'RedeemDetailsModalContent';
