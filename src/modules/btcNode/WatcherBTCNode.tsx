import React, { useCallback } from 'react';
import { useStores } from '../../stores';
import { useInterval } from '../../hooks/useInterval';

export const WatcherBTCNode: React.FC = React.memo(() => {
  const { btcNodeStore } = useStores();

  const updateInfo = useCallback(() => {
    btcNodeStore.loadBasicInfo();
  }, [btcNodeStore]);

  useInterval({ callback: updateInfo, timeout: 15000 });

  return null;
});

WatcherBTCNode.displayName = 'WatcherBTCNode';
