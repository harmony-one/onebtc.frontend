import React, { useCallback, useState } from 'react';
import { Box } from 'grommet';
import { Divider, Button, Text } from 'components/Base';
import { observer } from 'mobx-react';
import {
  dateFormat,
  formatWithEightDecimals,
  formatWithTwoDecimals,
} from '../../../../utils';
import { useStores } from '../../../../stores';
import { fromWei } from 'web3-utils';
import { Refresh } from 'grommet-icons';
import { Button as GrommetButton, Spinner } from 'grommet';
import { StakeInfo } from '../../../../stores/VaultStakeStore';

interface Props {
  vaultId: string;
}

const defaultValue: StakeInfo = {
  lockStartAt: '0',
  collateralDebt: '0',
  lockPeriod: '0',
  lockExpireAt: '0',
  accClaimableRewards: '0',
};

export const RewardBlock: React.FC<Props> = observer(({ vaultId }) => {
  const {
    dashboardVaultDetailsStore,
    vaultStore,
    vaultStakeStore,
  } = useStores();
  const handleClickStake = useCallback(() => {
    dashboardVaultDetailsStore.openStakeModal(vaultId);
  }, [dashboardVaultDetailsStore, vaultId]);
  const handleClickRewards = useCallback(() => {
    dashboardVaultDetailsStore.openRewardsModal(vaultId);
  }, [dashboardVaultDetailsStore, vaultId]);

  const stakeInfo = vaultStakeStore.getEntity(vaultId) || defaultValue;
  const vault = vaultStore.getEntity(vaultId);

  const [inProgress, setProgress] = useState(false);

  const handleClickRefresh = useCallback(() => {
    setProgress(true);

    setTimeout(() => {
      dashboardVaultDetailsStore
        .updateVaultAccClaimableRewards(vaultId)
        .then(() => {
          setProgress(false);
        })
        .catch(() => setProgress(false));
    }, 1000);
  }, [dashboardVaultDetailsStore, vaultId]);

  if (!vault || !stakeInfo) {
    return null;
  }

  const hasStaking = !!Number(stakeInfo.lockExpireAt);
  const stakedAmount = Number(stakeInfo.lockExpireAt) ? vault.collateral : '0';

  return (
    <Box gap="xsmall" direction="column">
      <Box direction="row" gap="xsmall">
        <Box fill="horizontal" justify="between" gap="xsmall">
          <Box gap="xxsmall">
            <Text size="small">Total Staked:</Text>
            <Text size="large" bold>
              {formatWithTwoDecimals(fromWei(stakedAmount))} ONE
            </Text>
            {hasStaking && (
              <Text size="small">
                Until: {dateFormat(Number(stakeInfo.lockExpireAt) * 1000)}
              </Text>
            )}
          </Box>
        </Box>

        <Box fill="horizontal" justify="between" gap="xsmall">
          <Box gap="xxsmall">
            <Text size="small">Rewards:</Text>
            <Box direction="row" gap="small">
              <Text size="large" bold>
                {formatWithEightDecimals(
                  fromWei(stakeInfo.accClaimableRewards),
                )}{' '}
                ONE
              </Text>
              <Box>
                {inProgress && <Spinner size="xsmall" pad="12px" />}
                {!inProgress && (
                  <GrommetButton
                    color="#00ADE8"
                    disabled={inProgress}
                    onClick={handleClickRefresh}
                  >
                    <Refresh />
                  </GrommetButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider fullwidth />

      <Box direction="row">
        <Box fill="horizontal">
          <Button
            bgColor="#00ADE8"
            onClick={handleClickStake}
            transparent={false}
          >
            Stake
          </Button>
        </Box>
        <Box fill="horizontal">
          <Button
            bgColor="#00ADE8"
            disabled={!Number(stakeInfo.accClaimableRewards)}
            onClick={handleClickRewards}
            transparent={false}
          >
            Claim rewards
          </Button>
        </Box>
      </Box>

      {/*<Box direction="row" gap="xsmall" justify="center">*/}
      {/*  <Button bgColor="#00ADE8" onClick={handleClick} transparent={false}>*/}
      {/*    3 months*/}
      {/*  </Button>*/}
      {/*  <Button bgColor="#00ADE8" onClick={handleClick} transparent={false}>*/}
      {/*    6 months*/}
      {/*  </Button>*/}
      {/*  <Button bgColor="#00ADE8" onClick={handleClick} transparent={false}>*/}
      {/*    12 months*/}
      {/*  </Button>*/}
      {/*</Box>*/}
    </Box>
  );
});

export default RewardBlock;
