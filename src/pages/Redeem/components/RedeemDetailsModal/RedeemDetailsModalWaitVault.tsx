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
}> = ({ redeemTxHash }) => {
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
    </Box>
  ));
};

RedeemDetailsModalWaitVault.displayName = 'RedeemDetailsModalWaitVault';
