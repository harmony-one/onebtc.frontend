import React, { useCallback } from 'react';
import { useStores } from '../../stores';
import { useInterval } from '../../hooks/useInterval';

export const WatcherDashboard: React.FC = React.memo(() => {
  const { btcRelayStore } = useStores();

  const updateBtcRelayInfo = useCallback(() => {
    btcRelayStore.loadInfo();
  }, [btcRelayStore]);

  useInterval({ callback: updateBtcRelayInfo, timeout: 5000 });

  return null;
});

WatcherDashboard.displayName = 'WatcherDashboard';
