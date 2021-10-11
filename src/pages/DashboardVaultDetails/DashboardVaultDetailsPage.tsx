import React, { useEffect, useMemo } from 'react';
import { Divider, Title } from '../../components/Base';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Box } from 'grommet';
import { useStores } from '../../stores';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { VaultInfo } from './components/VaultInfo';
import { VaultActions } from './components/VaultActions/VaultActions';
import { Paper } from '../../components/Paper';
import { VaultIssuedChart } from './components/VaultIssuedChart/VaultIssuedChart';
import { VaultBalances } from './components/VaultBalances/VaultBalances';
import { VaultIssueTable } from './components/VaultIssues/VaultIssueTable';
import { VaultRedeemTable } from './components/VaultRedeems/VaultRedeemTable';

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
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Box gap="small">
            <Title align="center">Vault Details</Title>
            <Divider colorful fullwidth />
          </Box>
          <Box gap="medium">
            <Box
              direction="row-responsive"
              responsive
              gap="medium"
              alignContent="stretch"
              pad={{ horizontal: 'xlarge' }}
            >
              <Box basis="1/2">
                <Paper>{vault && <VaultInfo vaultId={vaultId} />}</Paper>
              </Box>
              <Box basis="1/2">
                <Paper>
                  <VaultIssuedChart />
                </Paper>
              </Box>
            </Box>
          </Box>
          {isOwner && (
            <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
              <Title align="center">Vault owner actions</Title>
              <Divider colorful fullwidth />
              <Box align="center">
                <VaultActions />
              </Box>
            </Box>
          )}
          <Box>
            <VaultBalances vaultId={vaultId} />
          </Box>
          <Box>
            <VaultIssueTable vaultId={vaultId} />
          </Box>
          <Box>
            <VaultRedeemTable vaultId={vaultId} />
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

DashboardVaultDetailsPage.displayName = 'DashboardVaultDetailsPage';
