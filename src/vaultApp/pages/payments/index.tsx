import { Box } from 'grommet/components/Box';
import React from 'react';
import { VaultAppLayout } from '../../components/Layouts/VaultAppLayout';
import { Divider, Title } from '../../../components/Base';
import { OperationListTable } from './components/OperationListTable';

interface Props {}

export const PaymentsListPage: React.FC<Props> = () => {
  return (
    <VaultAppLayout>
      <Box gap="small">
        <Box align="center" gap="small">
          <Title>Incoming payments</Title>
          <Divider colorful fullwidth />
        </Box>
        <OperationListTable />
      </Box>
    </VaultAppLayout>
  );
};

PaymentsListPage.displayName = 'PaymentsListPage';
