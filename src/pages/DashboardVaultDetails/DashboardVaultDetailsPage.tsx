import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { useStores } from '../../stores';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import { VaultInfo } from './components/VaultInfo';
import { Paper } from '../../components/Paper';
import { VaultIssuedChart } from './components/VaultIssuedChart/VaultIssuedChart';
import { VaultLogs } from './components/VaultLogs';
import { useVaultWatcher } from '../../hooks/useVaultWatcher';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

interface Props {}

export const DashboardVaultDetailsPage: React.FC<Props> = observer(() => {
  const { vaultStore, user, dashboardVaultDetailsStore } = useStores();

  const { vaultId } = useParams<{ vaultId: string }>();

  const vault = vaultStore.getEntity(vaultId);

  useVaultWatcher({ vaultId });

  useEffect(() => {
    dashboardHistoryStore.loadData();
  }, []);

  const handleClickManage = useCallback(() => {
    dashboardVaultDetailsStore.openManageModal(vaultId);
  }, [dashboardVaultDetailsStore, vaultId]);

  const isOwner = useMemo(() => {
    if (!vault || !user.address) {
      return false;
    }

    return vault.id.toLowerCase() === user.address.toLowerCase();
  }, [vault, user]);

  return (
    <BaseLayout>
      <Box gap="medium">
        <Box gap="small">
          <Box direction="row" align="center">
            <Box basis="1/3">&nbsp;</Box>
            <Box basis="1/3">
              <Title align="center">Vault Details</Title>
            </Box>
            <Box basis="1/3" align="end">
              {isOwner && (
                <Button transparent size="small" onClick={handleClickManage}>
                  Manage
                </Button>
              )}
            </Box>
          </Box>
          <Divider colorful fullwidth />
        </Box>
        <Box gap="medium">
          <Box
            direction="row-responsive"
            responsive
            gap="medium"
            alignContent="stretch"
          >
            <Box basis="1/2">
              <Paper pad="medium">
                {vault && <VaultInfo vaultId={vaultId} />}
              </Paper>
            </Box>
            <Box basis="1/2">
              <Paper pad="medium">
                <VaultIssuedChart />
              </Paper>
            </Box>
          </Box>
        </Box>
        <Box>
          <VaultLogs vaultId={vaultId} />
        </Box>
      </Box>
    </BaseLayout>
  );
});

DashboardVaultDetailsPage.displayName = 'DashboardVaultDetailsPage';
