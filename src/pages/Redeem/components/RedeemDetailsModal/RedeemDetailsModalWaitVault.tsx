import React from 'react';
import { useObserver } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Text, Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModalConfirmation.styl';
import { SpinnerContainer } from '../../../../ui/Spinner/SpinnerContainer';
import { config } from '../../../../config';
import { cutText } from '../../../../services/cutText';
import LinkBitcoinTx from '../../../../components/LinkBitcoinTx';
import { BcoinBTCTx } from '../../../../services/bitcoin';

export const RedeemDetailsModalWaitVault: React.FC<{
  redeemTxHash: string;
  btcTx: BcoinBTCTx | null;
  isConfirmed: boolean;
}> = ({ btcTx, isConfirmed }) => {
  const confirmations = (btcTx && btcTx.confirmations) || 0;
  const requiredConfirmation = config.bitcoin.waitConfirmations;

  return useObserver(() => (
    <Box gap="small" align="center">
      <Box>
        <Title>Pending</Title>
      </Box>
      {!isConfirmed && (
        <Box className={styles.circleBorder} justify="center" align="center">
          <SpinnerContainer boxSize={32}>
            {btcTx && (
              <Text inline style={{ textAlign: 'center' }}>
                Waiting confirmations: {confirmations}/{requiredConfirmation}
              </Text>
            )}
            {!btcTx && (
              <Text inline bold style={{ textAlign: 'center' }}>
                Waiting for Vault
              </Text>
            )}
          </SpinnerContainer>
        </Box>
      )}
      {btcTx && (
        <Box>
          <Text>BTC Transaction: {cutText(btcTx.hash)}</Text>
        </Box>
      )}

      {btcTx && (
        <Box>
          <LinkBitcoinTx txHash={btcTx && btcTx.hash} text="View on explorer" />
        </Box>
      )}

      <Box>
        <Button bgColor="#46d7b6" disabled={true}>
          Execute redeem
        </Button>
      </Box>
    </Box>
  ));
};

RedeemDetailsModalWaitVault.displayName = 'RedeemDetailsModalWaitVault';
