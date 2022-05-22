import * as React from 'react';
import { Box } from 'grommet';

import { NavigateTabs } from '../../components/NavigateTabs';
import TransferForm from './components/TransferForm/TransferForm';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { BridgeContentContainer } from '../../components/BridgeContentContainer';
import { BridgeFormsSurface } from '../../components/BridgeFormsSurface';

export const TransferPage = () => {
  return (
    <BaseLayout>
      <Box align="center">
        <BridgeContentContainer>
          <NavigateTabs />

          <BridgeFormsSurface>
            <TransferForm />
          </BridgeFormsSurface>
        </BridgeContentContainer>
      </Box>
    </BaseLayout>
  );
};
