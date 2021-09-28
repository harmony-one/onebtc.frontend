import React from 'react';
import { BaseContainer, PageContainer } from '../../components';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';

type Props = {};

export const DashboardIssuesPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box>
          <Title>Issue Requests</Title>
        </Box>
        <Box>
          <Divider colorful fullwidth />
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardIssuesPage.displayName = 'DashboardIssuesPage';
