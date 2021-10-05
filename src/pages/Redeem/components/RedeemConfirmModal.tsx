import React from 'react';
import { Box } from 'grommet';
import { Text, Divider } from 'components/Base';
import { LinkHarmony } from '../../../components/LinkHarmony';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../../components/ActionModals';

export function RedeemConfirmModalContent({ total, txHash = '' }) {
  return (
    <Box direction="column" justify="center">
      <Box align="center">
        <Text>You will receive:</Text>
        <Text bold>{total} BTC</Text>
      </Box>
      <Box align="center">
        <Text>
          Transaction:&nbsp;
          <LinkHarmony hash={txHash} type="tx" />
        </Text>
      </Box>
    </Box>
  );
}

export function RedeemConfirmModal(props: TActionModalProps) {
  const { total, txHash } = props.actionData.data;
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <RedeemConfirmModalContent total={total} txHash={txHash} />
    </Box>
  );
}
