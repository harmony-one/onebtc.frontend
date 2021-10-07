import React, { useEffect, useMemo, useState } from 'react';
import { Divider, Title } from '../../components/Base';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Box } from 'grommet';
import { useStores } from '../../stores';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { VaultInfo } from './components/VaultInfo';
import { VaultActions } from './components/VaultActions/VaultActions';

interface Props {}

export const DashboardVaultDetailsPage: React.FC<Props> = observer(() => {
  const { vaultStore, user } = useStores();

  const { vaultId } = useParams<{ vaultId: string }>();

  const vault = vaultStore.vaultMap[vaultId];

  useEffect(() => {
    vaultStore.loadVault(vaultId);
  }, [vaultId, vaultStore]);

  const isOwner = useMemo(() => {
    if (!vault || !user.address) {
      return false;
    }

    return vault.id.toLowerCase() === user.address.toLowerCase();
  }, [vault, user]);

  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium">
          {isOwner && (
            <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
              <Title align="center">Vault owner actions</Title>
              <Divider colorful fullwidth />
              <Box align="center">
                <VaultActions />
              </Box>
            </Box>
          )}

          <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
            <Title align="center">Vault Details</Title>
            <Divider colorful fullwidth />
            {vault && <VaultInfo vaultId={vaultId} />}
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

DashboardVaultDetailsPage.displayName = 'DashboardVaultDetailsPage';
