import React from 'react';
import { Divider, Title } from '../../components/Base';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Box } from 'grommet';

interface Props {}

export const DashboardVaultDetailsPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Title align="center">Vault Details</Title>
          <Divider colorful fullwidth />
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardVaultDetailsPage.displayName = 'DashboardVaultDetailsPage';
