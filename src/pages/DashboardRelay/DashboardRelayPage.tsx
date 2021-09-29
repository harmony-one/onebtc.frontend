import React from 'react';
import { BaseContainer, PageContainer } from '../../components';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardRelayBlocks } from './components/DashboardRelayBlocks';
import { DashboardRelayInfo } from './components/DashboardRelayInfo';

type Props = {};

export const DashboardRelayPage: React.FC<Props> = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="medium" pad={{ horizontal: 'xlarge' }}>
          <Title align="center">BTC Relay</Title>
          <Divider colorful fullwidth />
          <DashboardRelayInfo />
          <Title>Blocks</Title>
          <Divider fullwidth />
          <Box>
            <DashboardRelayBlocks />
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};

DashboardRelayPage.displayName = 'DashboardRelayPage';
