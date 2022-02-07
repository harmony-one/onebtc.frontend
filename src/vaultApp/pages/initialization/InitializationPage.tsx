import React from 'react';
import { observer } from 'mobx-react';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Spinner } from '../../../ui';
import { Box } from 'grommet';
import { Divider, Title } from '../../../components/Base';

interface Props {}

export const InitializationPage: React.FC<Props> = observer(() => {
  return (
    <VaultAppLayout>
      <Box gap="small">
        <Box gap="small" align="center">
          <Title>Initialization...</Title>
          <Divider colorful fullwidth />
        </Box>
        <Box align="center">
          <Spinner />
        </Box>
      </Box>
    </VaultAppLayout>
  );
});

InitializationPage.displayName = 'HomePage';
