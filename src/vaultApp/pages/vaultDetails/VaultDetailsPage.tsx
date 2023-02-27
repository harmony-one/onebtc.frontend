import React, { useCallback, useMemo } from 'react';
import { useStores } from '../../../stores';
import { observer } from 'mobx-react';
import { Box } from 'grommet';
import { Button, Divider, Loader, Title } from '../../../components/Base';
import { Paper } from '../../../components/Paper';
import { VaultInfo } from '../../../pages/DashboardVaultDetails/components/VaultInfo';
import { VaultIssuedChart } from '../../../pages/DashboardVaultDetails/components/VaultIssuedChart/VaultIssuedChart';
import { VaultLogs } from '../../../pages/DashboardVaultDetails/components/VaultLogs';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Spinner } from '../../../ui';
import { addressIsEq } from '../../../utils/hmy';
import { EntityModals } from '../../../modules/entityModals/EntityModals';
import { routes } from '../../routes/routes';

interface Props { }

export const VaultDetailsPage: React.FC<Props> = observer(() => {
  const { vaultStore, user, actionModals, routing, dashboardVaultDetailsStore } = useStores();
  const { vaultAppStore } = useStores().vaultApp;
  const vaultId = vaultAppStore.vaultId;

  const handleClickManage = useCallback(() => {
    dashboardVaultDetailsStore.openManageModal(vaultId);
  }, [dashboardVaultDetailsStore, vaultId]);

  const vault = vaultStore.getEntity(vaultId);

  const isOwner = useMemo(() => {
    if (!vault || !user.address) {
      return false;
    }

    return addressIsEq(user.address, vault.id);
  }, [vault, user]);

  if (!vault) {
    return (
      <VaultAppLayout>
        <Box align="center">
          <Spinner />
        </Box>
      </VaultAppLayout>
    );
  }

  return (
    <VaultAppLayout>
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
                {vault && (
                  <VaultInfo
                    vaultId={vaultId}
                    syncProgress={vaultAppStore.syncProgress}
                  />
                )}
              </Paper>
            </Box>
            <Box basis="1/2">
              <Paper pad="medium" fill>
                <Box direction="column">
                  <VaultIssuedChart />
                  {vaultAppStore.loading ? <Loader /> :
                    <Box margin={{ vertical: 'large' }} justify="center" align="center">
                      <Button
                        onClick={() => {
                          vaultAppStore.sendBtcToHarmony().then(() => {
                            actionModals.open(
                              () => <Box pad="large">
                                <Title>Operation succefully created</Title>
                              </Box>,
                              {
                                applyText: 'Display operations list',
                                noValidation: true,
                                width: '400px',
                                showOther: true,
                                onApply: () => {
                                  routing.goTo(routes.operationList);
                                  return Promise.resolve();
                                },
                                onClose: () => {
                                  return Promise.resolve();
                                },
                              });
                          })
                        }}>
                        Transfer my BTC holdings to Harmony
                      </Button>
                    </Box>}
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
        <Box>
          <VaultLogs vaultId={vaultId} />
        </Box>
      </Box >
      <EntityModals />
    </VaultAppLayout >
  );
});

VaultDetailsPage.displayName = 'VaultDetailsPage';
