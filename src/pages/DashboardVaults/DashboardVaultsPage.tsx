import React, { useEffect } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardVaultTable } from './components/DashboardVaultTable';
import { DashboardVaultActivityChart } from '../Dashboard/components/DashboardVaultActivityChart';
import { DashboardCollateralChart } from '../Dashboard/components/DashboardCollateralChart';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { DashboardCard } from '../../components/Dashboard/DashboardCard';
import { DashboardCardBody } from '../../components/Dashboard/DashboardCardBody';

type Props = {};

export const DashboardVaultsPage: React.FC<Props> = () => {
  useEffect(() => {
    dashboardHistoryStore.loadData();
  }, []);

  return (
    <BaseLayout>
      <Box gap="medium">
        <Title align="center">Vaults</Title>
        <Divider colorful fullwidth />
        <Box justify="center" direction="row-responsive" wrap>
          <Box align="center" pad="xxsmall">
            <DashboardCard height="small">
              <DashboardCardBody>
                <DashboardVaultActivityChart />
              </DashboardCardBody>
            </DashboardCard>
          </Box>
          <Box align="center" pad="xxsmall">
            <DashboardCard height="small">
              <DashboardCardBody>
                <DashboardCollateralChart />
              </DashboardCardBody>
            </DashboardCard>
          </Box>
        </Box>
        <DashboardVaultTable />
      </Box>
    </BaseLayout>
  );
};

DashboardVaultsPage.displayName = 'DashboardVaultsPage';
