import React from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardRelayBlocks } from './components/DashboardRelayBlocks';
import { DashboardRelayInfo } from './components/DashboardRelayInfo';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

type Props = {};

export const DashboardRelayPage: React.FC<Props> = () => {
  return (
    <BaseLayout>
      <Box gap="medium">
        <Title align="center">BTC Relay</Title>
        <Divider colorful fullwidth />
        <DashboardRelayInfo />
        <Title>Blocks</Title>
        <Divider fullwidth />
        <Box>
          <DashboardRelayBlocks />
        </Box>
      </Box>
    </BaseLayout>
  );
};

DashboardRelayPage.displayName = 'DashboardRelayPage';
