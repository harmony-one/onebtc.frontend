import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { btcRelayClient } from '../modules/btcRelay/btcRelayClient';
import { BTCTx } from 'onebtc.sdk/lib/btcNode/types';

interface WatcherProps {
  issueId: string;
  confirmations: number;
}

export const useBtcWalletVaultIncomeWatcher = ({
  issueId,
  confirmations = 1,
}: WatcherProps): null | BTCTx => {
  const [btcTx, setBtcTx] = useState<BTCTx>(null);

  const loadBtcTx = useCallback(() => {
    btcRelayClient
      .loadIssue(issueId)
      .then(issue => {
        if (issue.btcTx) {
          setBtcTx(issue.btcTx);
        }
      })
      .catch(err => {
        console.log('### Error while load btc transaction', err);
      });
  }, [issueId]);

  const [stopInterval] = useInterval({ callback: loadBtcTx, timeout: 5000 });

  useEffect(() => {
    if (btcTx && btcTx.confirmations >= confirmations) {
      stopInterval();
    }
  }, [confirmations, btcTx, stopInterval]);

  return btcTx;
};
