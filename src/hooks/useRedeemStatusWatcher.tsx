import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { useStores } from '../stores';

interface WatcherProps {
  redeemId: string;
  requester: string;
}

export const useRedeemStatusWatcher = ({
  redeemId,
  requester,
}: WatcherProps): string => {
  const [status, setStatus] = useState<string>('0');
  const { user } = useStores();

  const loadIssueStatus = useCallback(() => {
    user.oneBtcClient &&
      user.oneBtcClient.methods
        .getRedeemStatus(requester, redeemId)
        .then(setStatus)
        .catch(err => {
          console.log('### err', err);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redeemId, requester, user.oneBtcClient]);

  const [stop] = useInterval({ callback: loadIssueStatus, timeout: 3000 });

  useEffect(() => {
    if (status === '2') {
      stop();
    }
  }, [status, stop]);

  return status;
};
