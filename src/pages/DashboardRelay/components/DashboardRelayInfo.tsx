import React from 'react';
import { Box } from 'grommet';
import { Text } from '../../../components/Base';
import { DashboardCardCircle } from '../../../components/Dashboard/DashboardCardCircle';
import { DashboardCard } from '../../../components/Dashboard/DashboardCard';
import { DashboardCardHead } from '../../../components/Dashboard/DashboardCardHead';
import { observer } from 'mobx-react';
import { useStores } from '../../../stores';
import { DashboardCardBtcRelay } from '../../../components/Dashboard/DashboardCardBtcRelay';
import { DashboardCardBody } from '../../../components/Dashboard/DashboardCardBody';

type Props = {};

export const DashboardRelayInfo: React.FC<Props> = observer(() => {
  const { btcNodeStore } = useStores();

  return (
    <Box direction="row-responsive" wrap justify="center">
      <Box pad="xxsmall" align="center">
        <DashboardCardBtcRelay />
      </Box>
      <Box pad="xxsmall" align="center">
        <DashboardCard>
          <DashboardCardHead>
            <Text>
              <a target="_blank" rel="noreferrer" href="https://blockchain.com">
                Verify on blockchain.com
              </a>
            </Text>
          </DashboardCardHead>
          <DashboardCardBody>
            <DashboardCardCircle
              title="Blockchain"
              subtext={btcNodeStore.lastBlockHeight}
              status="success"
            />
          </DashboardCardBody>
        </DashboardCard>
      </Box>
    </Box>
  );
});

DashboardRelayInfo.displayName = 'DashboardRelayInfo';
