import React, { useCallback } from 'react';
import { useStores } from '../../stores';
import { useInterval } from '../../hooks/useInterval';

export const WatcherBcoin: React.FC = React.memo(() => {
  const { bcoinStore } = useStores();

  const updateInfo = useCallback(() => {
    bcoinStore.loadBasicInfo();
  }, [bcoinStore]);

  useInterval({ callback: updateInfo, timeout: 5000 });

  return null;
});

WatcherBcoin.displayName = 'WatcherBcoin';
