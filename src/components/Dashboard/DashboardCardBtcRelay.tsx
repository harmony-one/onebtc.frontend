import React from 'react';
import { DashboardCardHead } from './DashboardCardHead';
import { Text } from '../Base';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { DashboardCardCircle } from './DashboardCardCircle';
import { DashboardCard } from './DashboardCard';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';

type Props = {
  showLink?: boolean;
};

export const DashboardCardBtcRelay: React.FC<Props> = observer(
  ({ showLink = false }) => {
    const { btcRelayStore } = useStores();

    const text = btcRelayStore.isSynchronized ? (
      <Text>
        BTC Relay is{' '}
        <Text bold color="Green500">
          synchronized
        </Text>
      </Text>
    ) : (
      <Text>
        BTC Relay is{' '}
        <Text bold color="Red500">
          not synchronized
        </Text>
      </Text>
    );

    const status = btcRelayStore.isSynchronized ? 'success' : 'error';
    return (
      <DashboardCard>
        <DashboardCardHead>
          <Text>{text}</Text>
          {showLink && (
            <Text>
              <NavLink to={routes.dashboardRelay}>VIEW BTC RELAY</NavLink>
            </Text>
          )}
        </DashboardCardHead>
        <DashboardCardCircle
          title="Synced Block"
          subtext={btcRelayStore.lastBlockHeight}
          status={status}
        />
      </DashboardCard>
    );
  },
);

DashboardCardBtcRelay.displayName = 'DashboardCardBtcRelay';
