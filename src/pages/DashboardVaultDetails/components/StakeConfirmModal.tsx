import React from 'react';
import { TActionModalProps } from '../../../components/ActionModals';
import { Box } from 'grommet';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { Divider, Text } from '../../../components/Base';

export function StakeConfirmModal(props: TActionModalProps) {
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Stake Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <Box direction="row" justify="center">
        <Text align="center">Success</Text>
      </Box>
    </Box>
  );
}
StakeConfirmModal.displayName = 'StakeConfirmModal';
