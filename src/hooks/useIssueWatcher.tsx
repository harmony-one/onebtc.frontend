import { useCallback } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  issueId: string;
}

export const useIssueWatcher = ({ issueId }: WatcherProps): string => {
  const { issueStore } = useStores();

  const loadIssue = useCallback(() => {
    issueStore.loadIssue(issueId);
  }, [issueStore, issueId]);

  useInterval({ callback: loadIssue, timeout: 3000 });

  return null;
};
