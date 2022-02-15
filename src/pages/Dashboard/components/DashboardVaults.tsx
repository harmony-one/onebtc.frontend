import React from 'react';
import { dashboardHistoryStore } from '../DashboardHistoryStore';
import { DashboardCard } from 'components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { Text } from '../../../components/Base';
import { observer } from 'mobx-react';
import { DashboardCollateralChart } from './DashboardCollateralChart';
import { formatZeroDecimals } from '../../../utils';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';

interface Props {}

export const DashboardVaults: React.FC<Props> = observer(() => {
  return (
    <DashboardCard>
      <DashboardCardHead>
        <Text>Locked collateral: </Text>
        <Text bold>
          {formatZeroDecimals(dashboardHistoryStore.totalCollateral)} ONE
        </Text>
      </DashboardCardHead>
      <DashboardCardBody>
        <DashboardCollateralChart />
      </DashboardCardBody>
    </DashboardCard>
  );
});

DashboardVaults.displayName = 'VaultIssuedChart';
