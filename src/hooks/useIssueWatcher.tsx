import { useCallback } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  issueId: string;
}

export const useIssueWatcher = ({ issueId }: WatcherProps) => {
  const { issueStore } = useStores();

  const loadIssue = useCallback(() => {
    issueStore.loadIssue(issueId);
  }, [issueStore, issueId]);

  return useInterval({ callback: loadIssue, timeout: 5000 });
};
