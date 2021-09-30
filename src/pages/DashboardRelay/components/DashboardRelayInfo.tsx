import React from 'react';
import { Box } from 'grommet';
import { Text } from '../../../components/Base';
import { DashboardCardCircle } from '../../../components/Dashboard/DashboardCardCircle';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import { DashboardCardBtcRelay } from '../../../components/Dashboard/DashboardCardBtcRelay';

type Props = {};

export const DashboardRelayInfo: React.FC<Props> = observer(() => {
  const { bcoinStore } = useStores();

  return (
    <Box direction="row" gap="small" justify="center">
      <DashboardCardBtcRelay />
      <DashboardCard>
        <DashboardCardHead>
          <Text>
            <a target="_blank" rel="noreferrer" href="https://blockchain.com">
              Verify on blockchain.com
            </a>
          </Text>
        </DashboardCardHead>
        <DashboardCardCircle
          title="Blockchain"
          subtext={bcoinStore.lastBlockHeight}
          status="success"
        />
      </DashboardCard>
    </Box>
  );
});

DashboardRelayInfo.displayName = 'DashboardRelayInfo';
