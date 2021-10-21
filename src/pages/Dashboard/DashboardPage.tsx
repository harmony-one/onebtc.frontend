import React, { useEffect } from 'react';
import { BaseContainer } from 'components/BaseContainer';
import { PageContainer } from 'components/PageContainer';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { DashboardCardBtcRelay } from '../../components/Dashboard/DashboardCardBtcRelay';
import { DashboardIssueRedeemCard } from './components/DashboardIssueRedeemCard';
import { DashboardVaultCard } from './components/DashboardVaultCard';
import { dashboardPageStore } from './DashboardPageStore';
import { DashboardActiveVault } from './components/DashboardActiveVault';
import { DashboardVaults } from './components/DashboardVaults';

type Props = {};

export const DashboardPage: React.FC<Props> = observer(() => {
  useEffect(() => {
    dashboardPageStore.loadPageData();
  }, []);

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
          <Box justify="center" direction="row-responsive" wrap>
            <DashboardIssueRedeemCard />
            <DashboardCardBtcRelay showLink />
            <DashboardVaultCard />
            <DashboardActiveVault />
            <DashboardVaults />
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});

DashboardPage.displayName = 'DashboardPage';
