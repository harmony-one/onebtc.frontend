import React from 'react';
import { DashboardCardHead } from './DashboardCardHead';
import { Text } from '../Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constants/routePaths';
import { DashboardCardCircle } from './DashboardCardCircle';
import { DashboardCard } from './DashboardCard';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { DashboardCardFooter } from './DashboardCardFooter';
import { DashboardCardBody } from './DashboardCardBody';

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
          <Text>BTC Relay: </Text>
          {statusText}
        </DashboardCardHead>
        <DashboardCardBody>
          <DashboardCardCircle
            title="Synced Blocks"
            subtext={btcRelayStore.lastBlockHeight}
            status={status}
          />
        </DashboardCardBody>
        {showLink && (
          <DashboardCardFooter>
            <Text align="right">
              <NavLink to={routes.dashboardRelay}>View BTC relay</NavLink>
            </Text>
          </DashboardCardFooter>
        )}
      </DashboardCard>
    );
  },
);

DashboardCardBtcRelay.displayName = 'DashboardCardBtcRelay';
