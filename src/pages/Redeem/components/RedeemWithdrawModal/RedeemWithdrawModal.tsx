import React, { useEffect } from 'react';
import { Box } from 'grommet';
import { Divider, Title } from 'components/Base';
import { useObserver } from 'mobx-react';
import { RedeemWithdrawModalContent } from './RedeemWithdrawModalContent';
import { useRedeemWatcher } from '../../../../hooks/useRedeemWatcher';
import { useStores } from '../../../../stores';

export const RedeemWithdrawModal = props => {
  const { redeemId } = props.actionData.data;
  const { redeemStore } = useStores();

  const redeemInfo = redeemStore.getRedeemInfo(redeemId);

  useRedeemWatcher({ redeemId });

  useEffect(() => {
    if (redeemInfo.btcTx && redeemInfo.btcTx.hash) {
      props.config.options.onApply();
    }
  }, [redeemInfo.btcTx, props.config.options]);

  return useObserver(() => (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Title align="center">Withdraw</Title>
      <Divider colorful fullwidth />
      <RedeemWithdrawModalContent redeemId={redeemId} />
    </Box>
  ));
};
