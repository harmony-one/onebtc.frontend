import React from 'react';
import { BaseContainer, PageContainer } from '../../components';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardVaultTable } from './components/DashboardVaultTable';

type Props = {};

export const DashboardVaultsPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Title align="center">Vaults</Title>
          <Divider colorful fullwidth />
          <DashboardVaultTable />
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardVaultsPage.displayName = 'DashboardVaultsPage';
