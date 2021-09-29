import React from 'react';
import { BaseContainer, PageContainer } from '../../components';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardRedeemsTable } from './components/DashboardRedeemsTable';

type Props = {};

export const DashboardRedeemsPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Title align="center">Redeem Requests</Title>
          <Divider colorful fullwidth />
          <DashboardRedeemsTable />
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardRedeemsPage.displayName = 'DashboardRedeemsPage';
