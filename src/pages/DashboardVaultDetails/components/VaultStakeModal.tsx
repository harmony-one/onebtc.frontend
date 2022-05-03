import React, { useCallback, useState } from 'react';
import { TActionModalProps } from '../../../components/ActionModals';
import { Box } from 'grommet';
import { Button, Divider, Text } from '../../../components/Base';
import { ModalHeader } from '../../../components/ActionModals/components/ModalHeader';
import styled from 'styled-components';
import { useStores } from '../../../stores';
import { calcStakingARP, STAKING_PERIODS } from 'utils/rewardHelpers';

const LockPeriod = styled(Box)<{ selected: boolean }>`
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

interface LockPeriodProps {
  onClick: () => void;
  selected: boolean;
  period: number;
  currentPeriod: number;
  extend: boolean;
}

const LockPeriodBlock: React.FC<LockPeriodProps> = ({
  onClick,
  selected,
  currentPeriod,
  period,
  extend,
}) => {
  return (
    <LockPeriod
      direction="column"
      gap="xsmall"
      onClick={onClick}
      selected={selected}
    >
      <Text size="xlarge" align="center" color="inherit" bold>
        {calcStakingARP(currentPeriod, period)}%
      </Text>
      <Text size="small" align="center" color="inherit" bold>
        {extend ? '+' : ''} {period} months
      </Text>
    </LockPeriod>
  );
};

export const VaultStakeModal: React.FC<TActionModalProps<{
  vaultId;
}>> = props => {
  const [period, setPeriod] = useState<STAKING_PERIODS>(STAKING_PERIODS.THREE);

  const { dashboardVaultDetailsStore, vaultStakeStore } = useStores();

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

  const stakeInfo = vaultStakeStore.getEntity(props.actionData.data.vaultId);
  const currentLockPeriod = stakeInfo && stakeInfo.lockPeriod;
  const extendMode = currentLockPeriod > 0;

  const checkLockPeriod = (lockPeriod: number, extendPeriod: number) => {
    return lockPeriod + extendPeriod <= STAKING_PERIODS.TWELVE;
  };

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

      {currentLockPeriod > 0 && (
        <Text>Current staking period: {currentLockPeriod} months</Text>
      )}

      <Box direction="row" gap="medium">
        {checkLockPeriod(currentLockPeriod, STAKING_PERIODS.THREE) && (
          <LockPeriodBlock
            extend={extendMode}
            selected={period === STAKING_PERIODS.THREE}
            onClick={() => setPeriod(STAKING_PERIODS.THREE)}
            period={STAKING_PERIODS.THREE}
            currentPeriod={currentLockPeriod}
          />
        )}
        {checkLockPeriod(currentLockPeriod, STAKING_PERIODS.SIX) && (
          <LockPeriodBlock
            extend={extendMode}
            selected={period === STAKING_PERIODS.SIX}
            onClick={() => setPeriod(STAKING_PERIODS.SIX)}
            period={STAKING_PERIODS.SIX}
            currentPeriod={currentLockPeriod}
          />
        )}
        {checkLockPeriod(currentLockPeriod, STAKING_PERIODS.TWELVE) && (
          <LockPeriodBlock
            extend={extendMode}
            selected={period === STAKING_PERIODS.TWELVE}
            onClick={() => setPeriod(STAKING_PERIODS.TWELVE)}
            period={STAKING_PERIODS.TWELVE}
            currentPeriod={currentLockPeriod}
          />
        )}
      </Box>

      <Box direction="row" justify="end">
        <Button
          disabled={currentLockPeriod >= STAKING_PERIODS.TWELVE}
          onClick={handleClickStake}
        >
          Stake
        </Button>
      </Box>
    </Box>
  );
};

VaultStakeModal.displayName = 'VaultStakeModal';
