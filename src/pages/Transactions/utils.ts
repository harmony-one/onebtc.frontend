import { IIssue, IRedeem } from '../../modules/dashboard/dashboardTypes';
import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import stores from '../../stores';

export const getRequesterIssuesStore = (
  requesterId: string,
): ListStoreConstructor<IIssue> => {
  const loadFn = params => {
    return dashboardClient.loadIssueList({
      requester: requesterId,
      ...params,
    });
  };

  return new ListStoreConstructor<IIssue>(stores, loadFn, {
    pollingInterval: 10000,
  });
};

export const getRequesterRedeemStore = (
  requesterId: string,
): ListStoreConstructor<IRedeem> => {
  const loadFn = params => {
    return dashboardClient.loadRedeemList({
      requester: requesterId,
      ...params,
    });
  };

  return new ListStoreConstructor<IRedeem>(stores, loadFn, {
    pollingInterval: 10000,
  });
};
