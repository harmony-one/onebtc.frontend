import React, { useState } from 'react';
import { TActionModalProps } from '../../../components/ActionModals';
import { Box } from 'grommet';
import { VaultActions } from './VaultActions/VaultActions';
import { Button, Divider, Text } from '../../../components/Base';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import styled from 'styled-components';

const ActionType = styled(Box)<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#00ade8' : 'none')};
  border-radius: 8px;
  padding: 12px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  color: ${props => (props.selected ? 'white' : '#00ade8')};
  border: ${props =>
    props.selected ? '2px solid #00ade8' : '2px solid #00ade8'};
`;

export const VaultRewardsModal: React.FC<TActionModalProps<{
  vaultId;
}>> = props => {
  const [option, setOption] = useState<'claim' | 'stake'>('claim');
  return (
    <Box pad="large" gap="medium">
      <ModalHeader title="Rewards" onClose={props.config.options.onClose} />

      <Divider colorful fullwidth />

      <Text>
        The reward can be collected to wallet or re-staked for compounding the
        interest.
      </Text>

      <Box direction="row" gap="medium">
        <ActionType
          direction="column"
          gap="xsmall"
          onClick={() => setOption('claim')}
          selected={option === 'claim'}
        >
          <Text size="xlarge" align="center" color="inherit" bold>
            Claim to wallet
          </Text>
        </ActionType>
        <ActionType
          direction="column"
          gap="xsmall"
          onClick={() => setOption('stake')}
          selected={option === 'stake'}
        >
          <Text size="xlarge" align="center" color="inherit" bold>
            Claim and re-stake
          </Text>
        </ActionType>
      </Box>

      <Text bold>You will receive 100 ONE</Text>
    </Box>
  );
};

VaultRewardsModal.displayName = 'VaultRewardsModal';
