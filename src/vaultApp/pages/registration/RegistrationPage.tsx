import React, { useCallback, useEffect, useState } from 'react';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Divider, Title, Text, Button } from '../../../components/Base';
import { Box } from 'grommet/components/Box';
import { Checkmark } from 'grommet-icons';
import { useStores } from '../../../stores';
import { routes } from '../../routes/routes';
import { LinkHarmony } from '../../../components/LinkHarmony';

interface Props {}

export const RegistrationPage: React.FC<Props> = () => {
  const { routing } = useStores();
  const { vaultAppStore } = useStores().vaultApp;

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error>(null);

  const handleRegister = useCallback(() => {
    setPending(true);
    vaultAppStore
      .registerVault()
      .then(() => {
        setPending(false);
      })
      .catch(err => {
        setError(err);
        setPending(false);
      });
  }, [vaultAppStore]);

  useEffect(() => {
    if (vaultAppStore.vaultInfo && vaultAppStore.vaultInfo.registered) {
      routing.goTo(routes.vaultDetails, { vaultId: vaultAppStore.vaultId });
    }
  }, [routing, vaultAppStore.vaultId, vaultAppStore.vaultInfo]);

  if (!vaultAppStore.vaultInfo) {
    return null;
  }

  return (
    <VaultAppLayout>
      <Box gap="small">
        <Box align="center" gap="small">
          <Title>Vault Registration</Title>
          <Divider colorful fullwidth />
        </Box>
        <Box align="center" gap="small">
          <Checkmark size="xlarge" color="green" />
          <Text bold>Service successfully started</Text>
        </Box>
        <Box align="center" gap="small">
          <Box direction="row" gap="xxsmall">
            <Text>Vault address: </Text>
            <LinkHarmony
              cut={false}
              hash={vaultAppStore.vaultId}
              type="address"
            />
          </Box>

          <Box direction="row" gap="xxsmall">
            <Text>Contract address: </Text>
            <LinkHarmony
              cut={false}
              hash={vaultAppStore.vaultInfo.contract}
              type="address"
            />
          </Box>

          <Text>Register Collateral amount: 10 ONE</Text>
          <Button
            isLoading={pending}
            disabled={pending}
            onClick={handleRegister}
          >
            Register your vault
          </Button>
        </Box>
        <Box align="center">
          {error && <Text color="red">{error.message}</Text>}
        </Box>
      </Box>
    </VaultAppLayout>
  );
};

RegistrationPage.displayName = 'RegistrationPage';
