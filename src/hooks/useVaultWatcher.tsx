import { useCallback } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  vaultId: string;
}

export const useVaultWatcher = ({ vaultId }: WatcherProps) => {
  const { vaultStore } = useStores();

  const loadVault = useCallback(() => {
    vaultStore.loadVault(vaultId);
  }, [vaultStore, vaultId]);

  useInterval({ callback: loadVault, timeout: 30000 });

  return null;
};
