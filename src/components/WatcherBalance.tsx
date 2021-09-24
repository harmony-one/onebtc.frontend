import React, { useCallback } from 'react';
import { useStores } from '../stores';
import { useInterval } from '../hooks/useInterval';

export const WatcherBalance: React.FC = React.memo(() => {
  const { user } = useStores();

  const updateBalance = useCallback(() => {
    user.updateBalance();
  }, [user]);

  useInterval({ callback: updateBalance, timeout: 5000 });

  return null;
});

WatcherBalance.displayName = 'WatcherBalance';
