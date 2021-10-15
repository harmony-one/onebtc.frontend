import { useCallback } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  redeemId: string;
}

export const useRedeemWatcher = ({ redeemId }: WatcherProps): string => {
  const { redeemStore } = useStores();

  const loadIssue = useCallback(() => {
    redeemStore.loadRedeem(redeemId);
  }, [redeemId, redeemStore]);

  useInterval({ callback: loadIssue, timeout: 3000 });

  return null;
};
