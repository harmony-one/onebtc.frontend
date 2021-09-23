import React from 'react';
import { useStores } from '../../../../stores';
import { Box } from 'grommet';
import { Divider, Text } from '../../../../components/Base';
import { RedeemDetailsModalTransaction } from './RedeemDetailsModalTransaction';
import { RedeemDetailsModalConfirmation } from './RedeemDetailsModalConfirmation';
import { RedeemDetailsModalWaitVault } from './RedeemDetailsModalWaitVault';
import { useBtcWalletIncomeWatcher } from '../../../../hooks/useBtcWalletIncomeWatcher';
import { config } from '../../../../config';

export const RedeemDetailsModalContent: React.FC<{
  redeemTxHash: string;
}> = ({ redeemTxHash }) => {
  const { redeemPageStore } = useStores();

  const redeemInfo = redeemPageStore.getRedeemInfo(redeemTxHash);
  const btcTx = useBtcWalletIncomeWatcher({
    bitcoinAddress: redeemInfo.bitcoinAddress,
    amount: Number(redeemInfo.rawRedeem.amount),
    confirmations: 2,
  });

  const confirmations = (btcTx && btcTx.confirmations) || 0;
  const isConfirmed = confirmations > config.bitcoin.waitConfirmations;

  return (
    <Box pad={{ horizontal: 'medium', top: 'medium' }} gap="small">
      <Text style={{ overflowWrap: 'break-word', textAlign: 'center' }}>
        Redeem # {redeemInfo.redeemId}
      </Text>
      <Divider fullwidth colorful />
      <Box direction="row-responsive" gap="medium" basis="full" align="start">
        <Box basis="1/2">
          <RedeemDetailsModalTransaction redeemTxHash={redeemTxHash} />
        </Box>
        <Box basis="1/2" gap="medium" align="center">
          {!isConfirmed && (
            <RedeemDetailsModalWaitVault
              btcTx={btcTx}
              isConfirmed={isConfirmed}
              redeemTxHash={redeemTxHash}
            />
          )}
          {isConfirmed && btcTx && (
            <RedeemDetailsModalConfirmation
              btcTx={btcTx}
              redeemTxHash={redeemTxHash}
            />
          )}
          {/*<RedeemWithdrawModalContent redeemTxHash={props.redeemTxHash} />*/}
        </Box>
      </Box>
    </Box>
  );
};

RedeemDetailsModalContent.displayName = 'RedeemDetailsModalContent';
