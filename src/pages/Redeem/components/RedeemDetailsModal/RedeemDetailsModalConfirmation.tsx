import React from 'react';
import cn from 'classnames';
import { useStores } from '../../../../stores';
import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { Text, Title } from '../../../../components/Base';
import * as styles from '../../../Issue/components/IssueDetailsModal/IssueDetailsModals.styl';
import { cutText } from '../../../../services/cutText';
import LinkBitcoin from '../../../../components/LinkBitcoin';
import { Checkmark } from 'grommet-icons';

interface Props {
  redeemId: string;
}

export const RedeemDetailsModalConfirmation: React.FC<Props> = observer(
  ({ redeemId }) => {
    const { redeemStore } = useStores();

    const redeemInfo = redeemStore.getRedeemInfo(redeemId);

    if (!redeemInfo || !redeemInfo.btcTx) {
      return null;
    }

    return (
      <Box gap="small" align="center">
        <Box>
          <Title>Confirmed</Title>
        </Box>
        <Box>
          <Text bold>You have received {redeemInfo.totalReceived} BTC</Text>
        </Box>
        <Box className={cn(styles.circle, styles.circleConfirmed)}>
          <Checkmark size="xlarge" color="white" />
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
  },
);

RedeemDetailsModalConfirmation.displayName = 'RedeemDetailsModalConfirmation';
