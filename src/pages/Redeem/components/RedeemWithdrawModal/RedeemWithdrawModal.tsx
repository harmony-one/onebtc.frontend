import React from 'react';
import { Box } from 'grommet';
import { Divider, Title } from 'components/Base';
import { useObserver } from 'mobx-react';
import { RedeemWithdrawModalContent } from './RedeemWithdrawModalContent';

export const RedeemWithdrawModal = props => {
  const { redeemId } = props.actionData.data;

  return useObserver(() => (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <Title align="center">Withdraw</Title>
      <Divider colorful fullwidth />
      <RedeemWithdrawModalContent redeemId={redeemId} />
    </Box>
  ));
};
