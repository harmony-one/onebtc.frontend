import React, { useCallback, useState } from 'react';
import { TActionModalProps } from '../../../components/ActionModals';
import { Box } from 'grommet';
import { VaultActions } from './VaultActions/VaultActions';
import { Button, Divider, Text } from '../../../components/Base';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import styled from 'styled-components';
import { useStores } from '../../../stores';

const StakePeriod = styled(Box)<{ selected: boolean }>`
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

export const VaultStakeModal: React.FC<TActionModalProps<{
  vaultId;
}>> = props => {
  const [period, setPeriod] = useState<3 | 6 | 12>(3);

  const { dashboardVaultDetailsStore } = useStores();

  const handleClickStake = useCallback(() => {
    props.config.options.onApply();

    dashboardVaultDetailsStore.extendVaultLockPeriod(
      props.actionData.data.vaultId,
      period,
    );
  }, [
    dashboardVaultDetailsStore,
    period,
    props.actionData.data.vaultId,
    props.config.options,
  ]);

  return (
    <Box pad="large" gap="medium">
      <ModalHeader title="Staking" onClose={props.config.options.onClose} />

      <Divider colorful fullwidth />

      <Text>
        Lock your collateral for 3, 6, or 12 months to receive 5, 10, 15% APR
        respectively. Note that, downgrade from higher lock period to lower is
        not allowed, however upgrade from lower to higher lock period is
        allowed.
      </Text>

      <Box direction="row" gap="medium">
        <StakePeriod
          direction="column"
          gap="xsmall"
          onClick={() => setPeriod(3)}
          selected={period === 3}
        >
          <Text size="xlarge" align="center" color="inherit" bold>
            5%
          </Text>
          <Text size="small" align="center" color="inherit" bold>
            3 months
          </Text>
        </StakePeriod>
        <StakePeriod
          direction="column"
          gap="xsmall"
          onClick={() => setPeriod(6)}
          selected={period === 6}
        >
          <Text size="xlarge" align="center" color="inherit" bold>
            10%
          </Text>
          <Text size="small" align="center" color="inherit" bold>
            6 months
          </Text>
        </StakePeriod>
        <StakePeriod
          direction="column"
          gap="xsmall"
          onClick={() => setPeriod(12)}
          selected={period === 12}
        >
          <Text size="xlarge" align="center" color="inherit" bold>
            15%
          </Text>
          <Text size="small" align="center" color="inherit" bold>
            12 months
          </Text>
        </StakePeriod>
      </Box>

      <Box direction="row" justify="end">
        <Button onClick={handleClickStake}>Stake</Button>
      </Box>

      {/*<Text bold>You will receive {(200000 / 100) * Number(period)} ONE</Text>*/}
    </Box>
  );
};

VaultStakeModal.displayName = 'VaultStakeModal';
