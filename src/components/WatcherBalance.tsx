import React, { useCallback } from 'react';
import { useStores } from '../stores';
import { useInterval } from '../hooks/useInterval';

export const WatcherBalance: React.FC = React.memo(() => {
  const { user, ratesStore } = useStores();

  const updateBalance = useCallback(() => {
    user.updateBalance();
  }, [user]);

  const loadRates = useCallback(() => {
    ratesStore.loadRates();
  }, [ratesStore]);

  useInterval({ callback: loadRates, timeout: 30000 });
  useInterval({ callback: updateBalance, timeout: 5000 });

  return null;
});

WatcherBalance.displayName = 'WatcherBalance';
