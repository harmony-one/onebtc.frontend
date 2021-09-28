import React from 'react';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { DashboardCardBtcRelay } from '../../components/Dashboard/DashboardCardBtcRelay';

type Props = {};

export const DashboardPage: React.FC<Props> = observer(() => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="small">
          <Box>
            <Title align="center">Dashboard</Title>
          </Box>
          <Box>
            <Divider colorful fullwidth />
          </Box>
          <Box direction="row" gap="small">
            <DashboardCardBtcRelay showLink />
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

DashboardPage.displayName = 'DashboardPage';
