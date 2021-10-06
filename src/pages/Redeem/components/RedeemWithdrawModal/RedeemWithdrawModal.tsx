import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { Divider, Title } from 'components/Base';
import { useObserver } from 'mobx-react';
import { RedeemWithdrawModalContent } from './RedeemWithdrawModalContent';
import { useBtcWalletIncomeWatcher } from '../../../../hooks/useBtcWalletIncomeWatcher';
import { config } from '../../../../config';

export const RedeemWithdrawModal = props => {
  const { redeemId } = props.actionData.data;

  const btcTx = useBtcWalletIncomeWatcher({
    redeemId,
    confirmations: config.bitcoin.waitConfirmations,
  });

  useEffect(() => {
    if (btcTx && btcTx.hash) {
      props.config.options.onApply();
    }
  }, [btcTx, props.config.options]);

  return useObserver(() => (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Title align="center">Withdraw</Title>
      <Divider colorful fullwidth />
      <RedeemWithdrawModalContent redeemId={redeemId} />
    </Box>
  ));
};
