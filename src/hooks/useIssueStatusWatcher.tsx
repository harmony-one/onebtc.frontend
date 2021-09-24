import { useCallback, useState } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  issueId: string;
  requester: string;
}

export const useIssueStatusWatcher = ({
  issueId,
  requester,
}: WatcherProps): string => {
  const { user } = useStores();
  const [status, setStatus] = useState<string>('0');

  const loadIssueStatus = useCallback(() => {
    user.oneBtcClient &&
      user.oneBtcClient.methods
        .getIssueStatus(requester, issueId)
        .then(setStatus)
        .catch(err => {
          console.log('### err', err);
        });
  }, [issueId, user.oneBtcClient, requester]);

  useInterval({ callback: loadIssueStatus, timeout: 5000 });

  return status;
};
