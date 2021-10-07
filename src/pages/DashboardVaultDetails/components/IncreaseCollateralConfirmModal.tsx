import React from 'react';
import { Box } from 'grommet';
import { Text, Divider } from 'components/Base';
import { LinkHarmony } from '../../../components/LinkHarmony';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import { TActionModalProps } from '../../../components/ActionModals';

interface Props {
  total: string;
  txHash: string;
}

const IncreaseCollateralConfirmModalContent: React.FC<Props> = ({
  total,
  txHash = '',
}) => {
  return (
    <Box direction="column" justify="center" gap="small">
      <Box align="center">
        <Text>You receive:</Text>
        <Text bold>{total} ONE</Text>
      </Box>
      <Box direction="row" justify="center">
        <Text>Transaction:&nbsp;</Text>
        <LinkHarmony hash={txHash} type="tx" />
      </Box>
    </Box>
  );
};

IncreaseCollateralConfirmModalContent.displayName =
  'IncreaseCollateralConfirmModalContent';

export const IncreaseCollateralConfirmModal: React.FC<TActionModalProps> = props => {
  const { total = '', txHash = '' } = props.actionData.data;
  const { onClose } = props.config.options;
  return (
    <Box pad={{ horizontal: 'medium', vertical: 'medium' }} gap="small">
      <ModalHeader title="Confirmed" onClose={onClose} />
      <Divider colorful fullwidth />
      <IncreaseCollateralConfirmModalContent total={total} txHash={txHash} />
    </Box>
  );
};

IncreaseCollateralConfirmModal.displayName = 'IncreaseCollateralConfirmModal';
