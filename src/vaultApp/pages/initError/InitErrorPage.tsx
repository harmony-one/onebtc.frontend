import React from 'react';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Box } from 'grommet';
import { Divider, Title, Text } from '../../../components/Base';

interface Props {}

export const InitErrorPage: React.FC<Props> = () => {
  return (
    <VaultAppLayout>
      <Box gap="small">
        <Box gap="small" align="center">
          <Title>Service starting error</Title>
          <Divider colorful fullwidth />
        </Box>
        <Box>
          <Text>
            The service started with an error, please make sure that you added
            the keys according to the{' '}
            <a href="https://www.notion.so/harmonyone/OneBtc-Vault-Client-028ce24ad5a249c4869e69768d06c3b7">
              instructions
            </a>{' '}
            . If this didn't help, contact support.
          </Text>
        </Box>
      </Box>
    </VaultAppLayout>
  );
};

InitErrorPage.displayName = 'InitErrorPage';
