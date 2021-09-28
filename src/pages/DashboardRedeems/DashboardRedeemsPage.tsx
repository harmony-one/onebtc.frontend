import React from 'react';
import { BaseContainer, PageContainer } from '../../components';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';

type Props = {};

export const DashboardRedeemsPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box>
          <Title>Redeem Requests</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardRedeemsPage.displayName = 'DashboardRedeemsPage';
