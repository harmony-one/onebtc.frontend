import React, { useEffect } from 'react';
import { Divider, Title } from '../../components/Base';
import { Box } from 'grommet';
import { DashboardVaultTable } from './components/DashboardVaultTable';
import { Paper } from 'components/Paper';
import { DashboardVaultActivityChart } from '../Dashboard/components/DashboardVaultActivityChart';
import { DashboardCollateralChart } from '../Dashboard/components/DashboardCollateralChart';
import { dashboardHistoryStore } from '../Dashboard/DashboardHistoryStore';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

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
        <Box gap="xsmall" direction="row-responsive">
          <Paper>
            <DashboardVaultActivityChart />
          </Paper>
          <Paper>
            <DashboardCollateralChart />
          </Paper>
        </Box>
        <DashboardVaultTable />
      </Box>
    </BaseLayout>
  );
};

DashboardVaultsPage.displayName = 'DashboardVaultsPage';
