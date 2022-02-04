import { useCallback } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';
import { ONE_SECOND } from '../constants/date';

interface WatcherProps {
  vaultId: string;
}

export const useVaultWatcher = ({ vaultId }: WatcherProps) => {
  const { vaultStore } = useStores();

  const loadVault = useCallback(() => {
    if (vaultId) {
      vaultStore.loadVault(vaultId);
    }
  }, [vaultStore, vaultId]);

  useInterval({ callback: loadVault, timeout: ONE_SECOND * 10 });

  return null;
};
