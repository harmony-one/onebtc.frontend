import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';
import { IssueStatus } from 'onebtc.sdk/lib/blockchain/hmy/types';

interface WatcherProps {
  issueId: string;
  requester: string;
}

export const useIssueStatusWatcher = ({
  issueId,
  requester,
}: WatcherProps): string => {
  const { user } = useStores();
  const [status, setStatus] = useState<IssueStatus>(IssueStatus.PENDING);

  const loadIssueStatus = useCallback(() => {
    user.oneBtcClient &&
      user.oneBtcClient.methods
        .getIssueStatus(requester, issueId)
        .then(setStatus)
        .catch(err => {
          console.log('### err', err);
        });
  }, [issueId, user.oneBtcClient, requester]);

  const [stop] = useInterval({ callback: loadIssueStatus, timeout: 3000 });

  useEffect(() => {
    if (status === IssueStatus.COMPLETED) {
      stop();
    }
  }, [status, stop]);

  return status;
};
