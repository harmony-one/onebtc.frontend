import React from 'react';
import { TActionModalProps } from '../../../components/ActionModals';
import { Box } from 'grommet';
import { VaultActions } from './VaultActions/VaultActions';
import { Divider } from '../../../components/Base';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';

export const VaultManageModal: React.FC<TActionModalProps> = props => {
  return (
    <Box pad="large" gap="medium">
      <ModalHeader
        title="Manage vault"
        onClose={props.config.options.onClose}
      />
      <Divider colorful fullwidth />
      <VaultActions />
    </Box>
  );
};

VaultManageModal.displayName = 'VaultManageModal';
