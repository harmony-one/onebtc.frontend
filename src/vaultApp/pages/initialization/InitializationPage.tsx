import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import { Box } from 'grommet';
import { VaultClientStatus } from '../../stores/VaultAppStore';
import { Button, Divider, Title, Text, Loader } from '../../../components/Base';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { VaultInfo } from './components/VaultInfo';

interface Props {}

export const InitializationPage: React.FC<Props> = observer(() => {
  const { vaultAppStore } = useStores().vaultApp;

  useEffect(() => {
    vaultAppStore.onInit();
  }, [vaultAppStore]);

  const handleRegister = useCallback(() => {
    vaultAppStore.registerVault();
  }, [vaultAppStore]);

  const isWaitLaunch =
    vaultAppStore.status === VaultClientStatus.WAITING_LAUNCH;
  const isWaitSync = vaultAppStore.status === VaultClientStatus.WAITING_SYNC;
  const isWaitReg =
    vaultAppStore.status === VaultClientStatus.WAITING_REGISTRATION;

  const isLoading = !vaultAppStore.vaultInfo;

  return (
    <VaultAppLayout>
      <Box gap="small">
        <Box align="center" gap="small">
          <Title>Status Page</Title>
          <Divider colorful fullwidth />
        </Box>
        <Box align="center">
          <Text>
            status: {vaultAppStore.vaultInfo && vaultAppStore.vaultInfo.status}
          </Text>
        </Box>
        {isLoading && <Loader />}
        <Box align="center">
          {isWaitSync && (
            <Box align="center" gap="small">
              <Box>Waiting or sync</Box>
              <Box>sync progress: {vaultAppStore.vaultInfo.syncProgress}</Box>
            </Box>
          )}
          {isWaitLaunch && (
            <Box align="center" gap="small">
              <Box>Waiting or launch</Box>
              <Box>sync progress: {vaultAppStore.vaultInfo.status}</Box>
            </Box>
          )}
          {isWaitReg && (
            <Box align="center" gap="small">
              <Box>Please, register your vault</Box>
              <Button onClick={handleRegister}>Registration</Button>
            </Box>
          )}
        </Box>
        <VaultInfo />
      </Box>
    </VaultAppLayout>
  );
});

InitializationPage.displayName = 'HomePage';
