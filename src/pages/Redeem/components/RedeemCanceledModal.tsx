import React from 'react';
import { Box } from 'grommet';
import { Text, Divider } from 'components/Base';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../../components/ActionModals';

export const RedeemCanceledModalContent: React.FC = () => {
  return (
    <Box direction="column" justify="center" gap="small">
      <Box align="center">
        <Text>Redeem successful canceled</Text>
      </Box>
    </Box>
  );
};

RedeemCanceledModalContent.displayName = 'RedeemCanceledModalContent';

export const RedeemCanceledModal: React.FC<TActionModalProps> = props => {
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <RedeemCanceledModalContent />
    </Box>
  );
};

RedeemCanceledModal.displayName = 'RedeemCanceledModal';
