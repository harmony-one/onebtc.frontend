import React from 'react';
import { DashboardCardHead } from './DashboardCardHead';
import { Text } from '../Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { DashboardCardCircle } from './DashboardCardCircle';
import { DashboardCard } from './DashboardCard';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { Box } from 'grommet';

type Props = {
  showLink?: boolean;
};

export const DashboardCardBtcRelay: React.FC<Props> = observer(
  ({ showLink = false }) => {
    const { btcRelayStore } = useStores();

    const status = btcRelayStore.isSynchronized ? 'success' : 'error';
    const statusText = btcRelayStore.isSynchronized ? (
      <Text bold color="Green500">
        synchronized
      </Text>
    ) : (
      <Text bold color="Red500">
        not synchronized
      </Text>
    );

    return (
      <DashboardCard>
        <DashboardCardHead>
          <Box>
            <Text>BTC Relay is: </Text>
            {statusText}
          </Box>
          {showLink && (
            <Text align="right">
              <NavLink to={routes.dashboardRelay}>VIEW BTC RELAY</NavLink>
            </Text>
          )}
        </DashboardCardHead>
        <DashboardCardCircle
          title="Synced Blocks"
          subtext={btcRelayStore.lastBlockHeight}
          status={status}
        />
      </DashboardCard>
    );
  },
);

DashboardCardBtcRelay.displayName = 'DashboardCardBtcRelay';
