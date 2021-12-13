import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Spinner } from '../../../ui';
import { Box } from 'grommet';

interface Props {}

export const InitializationPage: React.FC<Props> = observer(() => {
  const { vaultAppStore } = useStores().vaultApp;

  useEffect(() => {
    vaultAppStore.onInit();
  }, [vaultAppStore]);

  return (
    <VaultAppLayout>
      <Box align="center">
        <Spinner />
      </Box>
    </VaultAppLayout>
  );
});

InitializationPage.displayName = 'HomePage';
