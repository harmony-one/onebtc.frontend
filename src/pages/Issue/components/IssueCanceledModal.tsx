import React from 'react';
import { Box } from 'grommet';
import { Text, Divider } from 'components/Base';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../../components/ActionModals';

export const IssueCanceledModalContent: React.FC = () => {
  return (
    <Box direction="column" justify="center" gap="small">
      <Box align="center">
        <Text>Issue successful canceled</Text>
      </Box>
    </Box>
  );
};

IssueCanceledModalContent.displayName = 'IssueCanceledModalContent';

export const IssueCanceledModal: React.FC<TActionModalProps> = props => {
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <IssueCanceledModalContent />
    </Box>
  );
};

IssueCanceledModal.displayName = 'IssueCanceledModal';
