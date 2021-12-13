import React, { useCallback } from 'react';
import { useStores } from '../../stores';
import { ONE_SECOND } from '../../constants/date';
import { useInterval } from '../../hooks/useInterval';

export const WatcherVaultInfo: React.FC = React.memo(() => {
  const { vaultAppStore } = useStores().vaultApp;

  const updateVaultInfo = useCallback(() => {
    vaultAppStore.loadVaultInfo();
  }, [vaultAppStore]);

  useInterval({ callback: updateVaultInfo, timeout: ONE_SECOND * 5 });

  return null;
});

WatcherVaultInfo.displayName = 'WatcherBalance';
