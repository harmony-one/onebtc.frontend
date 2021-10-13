import React, { useState } from 'react';
import { Box } from 'grommet';
import { LargeTab } from '../../../../components/LargeTab/LargeTab';
import IncreaseCollateralForm from '../IncreaseCollateralForm/IncreaseCollateralForm';
import WithdrawCollateralForm from '../WithdrawCollateralForm/WithdrawCollateralForm';

interface Props {
  vaultId: string;
}

export const VaultActions: React.FC<Props> = ({ vaultId }) => {
  const [tab, setTab] = useState<'increase' | 'withdraw'>('increase');

  return (
    <Box fill style={{ maxWidth: '520px' }}>
      <Box
        fill
        direction="row"
        justify="between"
        gap="medium"
        margin={{ bottom: 'small' }}
      >
        <LargeTab
          title="Increase"
          onClick={() => {
            setTab('increase');
          }}
          active={tab === 'increase'}
        />
        <LargeTab
          title="Withdraw"
          onClick={() => {
            setTab('withdraw');
          }}
          active={tab === 'withdraw'}
        />
      </Box>
      <Box>
        {tab === 'increase' && <IncreaseCollateralForm vaultId={vaultId} />}
        {tab === 'withdraw' && <WithdrawCollateralForm vaultId={vaultId} />}
      </Box>
    </Box>
  );
};

VaultActions.displayName = 'VaultActions';
