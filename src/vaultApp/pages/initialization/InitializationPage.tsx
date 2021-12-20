import React from 'react';
import { observer } from 'mobx-react';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Spinner } from '../../../ui';
import { Box } from 'grommet';

interface Props {}

export const InitializationPage: React.FC<Props> = observer(() => {
  return (
    <VaultAppLayout>
      <Box align="center">
        <Spinner />
      </Box>
    </VaultAppLayout>
  );
});

InitializationPage.displayName = 'HomePage';
