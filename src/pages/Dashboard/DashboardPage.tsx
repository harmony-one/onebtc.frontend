import React from 'react';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Divider, Text, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { DashboardCardBtcRelay } from '../../components/Dashboard/DashboardCardBtcRelay';
import { DashboardIssueRedeemCard } from './components/DashboardIssueRedeemCard';
import { DashboardVaultCard } from './components/DashboardVaultCard';

type Props = {};

export const DashboardPage: React.FC<Props> = observer(() => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box gap="small" pad={{ horizontal: 'xlarge' }}>
          <Box>
            <Title align="center">Dashboard</Title>
          </Box>
          <Box>
            <Divider colorful fullwidth />
          </Box>
          <Box wrap direction="row">
            <Box pad="xxsmall">
              <DashboardCardBtcRelay showLink />
            </Box>
            <Box pad="xxsmall">
              <DashboardVaultCard />
            </Box>
            <Box pad="xxsmall">
              <DashboardIssueRedeemCard />
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

DashboardPage.displayName = 'DashboardPage';
