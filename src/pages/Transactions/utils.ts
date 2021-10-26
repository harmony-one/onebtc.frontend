import { IIssue, IRedeem } from '../../modules/btcRelay/btcRelayTypes';
import { ListStoreConstructor } from '../../stores/core/ListStoreConstructor';
import { btcRelayClient } from '../../modules/btcRelay/btcRelayClient';
import stores from '../../stores';

export const getRequesterIssuesStore = (
  requesterId: string,
): ListStoreConstructor<IIssue> => {
  const loadFn = params => {
    return btcRelayClient.loadIssueList({
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
    return btcRelayClient.loadRedeemList({
      requester: requesterId,
      ...params,
    });
  };

  return new ListStoreConstructor<IRedeem>(stores, loadFn, {
    pollingInterval: 10000,
  });
};
