import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { VaultInfo } from './components/VaultInfo';
import { Paper } from '../../components/Paper';
import { VaultIssuedChart } from './components/VaultIssuedChart/VaultIssuedChart';
import { VaultLogs } from './components/VaultLogs';
import { useVaultWatcher } from '../../hooks/useVaultWatcher';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { addressIsEq } from '../../utils/hmy';
import { EntityModals } from '../../modules/entityModals/EntityModals';
import RewardBlock from './components/RewardBlock/RewardBlock';

interface Props {
  vaultId: string;
}

export const DashboardVaultDetailsPage: React.FC<Props> = observer(
  ({ vaultId }) => {
    const {
      vaultStore,
      vaultStakeStore,
      user,
      dashboardVaultDetailsStore,
    } = useStores();

    const vault = vaultStore.getEntity(vaultId);

    useVaultWatcher({ vaultId });

    useEffect(() => {
      dashboardHistoryStore.loadData();
      vaultStakeStore.loadVault(vaultId);
    }, [vaultId, vaultStakeStore]);

    const handleClickManage = useCallback(() => {
      dashboardVaultDetailsStore.openManageModal(vaultId);
    }, [dashboardVaultDetailsStore, vaultId]);

    const isOwner = useMemo(() => {
      if (!vault || !user.address) {
        return false;
      }

      return addressIsEq(user.address, vault.id);
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
                <Paper fill pad="medium">
                  {isOwner && <RewardBlock vaultId={vaultId} />}
                  {!isOwner && <VaultIssuedChart />}
                </Paper>
              </Box>
            </Box>
          </Box>
          <Box>
            <VaultLogs vaultId={vaultId} />
          </Box>
        </Box>
        <EntityModals />
      </BaseLayout>
    );
  },
);

DashboardVaultDetailsPage.displayName = 'DashboardVaultDetailsPage';
