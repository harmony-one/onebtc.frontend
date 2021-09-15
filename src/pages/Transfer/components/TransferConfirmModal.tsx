import React from 'react';
import { Box } from 'grommet';
import { Text, Divider } from 'components/Base';
import LinkHarmonyTx from '../../../components/LinkHarmonyTx';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../../components/ActionModals';

export function TransferCompletedModalContent({ total, txHash }) {
  return (
    <Box gap="small" align="center">
      <Box align="center">
        <Text>Recipient have received:</Text>
        <Text bold>{total} OneBTC</Text>
      </Box>
      <Box>
        <Text>
          Tx:&nbsp;
          <LinkHarmonyTx txHash={txHash} />
        </Text>
      </Box>
    </Box>
  );
}

export function TransferConfirmModal(props: TActionModalProps) {
  const { total, txHash } = props.actionData.data;
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <TransferCompletedModalContent total={total} txHash={txHash} />
    </Box>
  );
}
