import { IIssue, IRedeem } from '../../modules/dashboard/dashboardTypes';
import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import stores from '../../stores';
import { useCallback, useEffect, useMemo } from 'react';

export const useIssueListStore = ({ requesterId }: { requesterId: string }) => {
  const loadIssueList = useCallback(
    params => {
      return dashboardClient.loadIssueList({
        requester: requesterId,
        ...params,
      });
    },
    [requesterId],
  );

  const store = useMemo(() => {
    const store = new ListStoreConstructor<IIssue>(stores, loadIssueList, {
      pollingInterval: 10000,
    });

    store.init();

    return store;
  }, [loadIssueList]);

  useEffect(() => {
    return () => {
      store.clear();
    };
  }, [store]);

  return store;
};

export const useRedeemListStore = ({
  requesterId,
}: {
  requesterId: string;
}) => {
  const loadRedeemList = useCallback(
    params => {
      return dashboardClient.loadRedeemList({
        requester: requesterId,
        ...params,
      });
    },
    [requesterId],
  );

  const store = useMemo(() => {
    const store = new ListStoreConstructor<IRedeem>(stores, loadRedeemList, {
      pollingInterval: 10000,
    });

    store.init();

    return store;
  }, [loadRedeemList]);

  useEffect(() => {
    return () => {
      store.clear();
    };
  }, [store]);

  return store;
};
