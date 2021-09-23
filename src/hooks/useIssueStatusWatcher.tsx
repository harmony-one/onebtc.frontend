import { useCallback, useState } from 'react';
import { useInterval } from './useInterval';

interface WatcherProps {
  oneBtcClient: any;
  issueId: string;
  requester: string;
}

export const useIssueStatusWatcher = ({
  oneBtcClient,
  issueId,
  requester,
}: WatcherProps): string => {
  const [status, setStatus] = useState<string>('0');

  const loadIssueStatus = useCallback(() => {
    oneBtcClient.methods
      .getIssueStatus(requester, issueId)
      .then(setStatus)
      .catch(err => {
        console.log('### err', err);
      });
  }, [issueId, oneBtcClient.methods, requester]);

  useInterval({ callback: loadIssueStatus, timeout: 5000 });

  return status;
};
