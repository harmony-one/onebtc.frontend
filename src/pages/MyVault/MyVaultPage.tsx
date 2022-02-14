import React from 'react';
import { DashboardVaultDetailsPage } from '../DashboardVaultDetails/DashboardVaultDetailsPage';
import { useStores } from '../../stores';
import { getAddress } from '@harmony-js/crypto';
import { observer } from 'mobx-react';

interface Props {}

export const MyVaultPage: React.FC<Props> = observer(() => {
  const { user } = useStores();

  if (!user.address) {
    return null;
  }

  const vaultId = getAddress(user.address).checksum;

  return <DashboardVaultDetailsPage vaultId={vaultId} />;
});

MyVaultPage.displayName = 'MyVaultPage';
