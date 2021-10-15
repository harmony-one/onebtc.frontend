import { useCallback } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  vaultId: string;
}

export const useVaultWatcher = ({ vaultId }: WatcherProps) => {
  const { vaultStore } = useStores();

  const loadIssue = useCallback(() => {
    vaultStore.loadVault(vaultId);
  }, [vaultStore, vaultId]);

  useInterval({ callback: loadIssue, timeout: 5000 });

  return null;
};
