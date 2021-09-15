import React from 'react';
import { Box } from 'grommet';
import { Title, Text, Divider } from 'components/Base';
import LinkHarmonyTx from '../../../components/LinkHarmonyTx';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../../components/ActionModals';

export function IssueConfirmModalContent({ total, txHash = '' }) {
  return (
    <Box direction="column" justify="center" gap="small">
      <Box align="center">
        <Text>You have received:</Text>
        <Text bold>{total} OneBTC</Text>
      </Box>
      <Box align="center">
        <Text>
          Transaction:&nbsp;
          <LinkHarmonyTx txHash={txHash} />
        </Text>
      </Box>
    </Box>
  );
}

export function IssueConfirmModal(props: TActionModalProps) {
  const { total, txHash } = props.actionData.data;
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <IssueConfirmModalContent total={total} txHash={txHash} />
    </Box>
  );
}
