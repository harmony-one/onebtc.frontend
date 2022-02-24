import React, { useCallback } from 'react';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Box } from 'grommet';
import { Divider, Title, Text, Button } from '../../../components/Base';
import { useStores } from 'stores';

interface Props {}

export const InitErrorPage: React.FC<Props> = () => {
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const { vaultAppStore } = useStores().vaultApp;

  return (
    <VaultAppLayout>
      <Box gap="small">
        <Box gap="small" align="center">
          <Title>Service starting error</Title>
          <Divider colorful fullwidth />
        </Box>
        <Box align="center">
          <Text>
            The service started with an error: {' '}
            {
              vaultAppStore.vaultInfo?.error &&
              <span style={{ color: 'red' }}>
                {vaultAppStore.vaultInfo?.error}
              </span>
            }. <br /> Please make sure that you added the keys according to the{' '}
            <a href="https://www.notion.so/harmonyone/OneBtc-Vault-Client-028ce24ad5a249c4869e69768d06c3b7">
              instructions
            </a>{' '}
            . If this didn't help, contact support.
          </Text>
        </Box>
        <Box align="center">
          <Button onClick={handleReload}>Reload page</Button>
        </Box>
      </Box>
    </VaultAppLayout>
  );
};

InitErrorPage.displayName = 'InitErrorPage';
