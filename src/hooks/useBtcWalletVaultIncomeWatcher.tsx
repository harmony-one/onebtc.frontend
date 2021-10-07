import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import BtcRelayClient from '../modules/btcRelay/btcRelayClient';
import { BTCTransaction } from '../modules/btcRelay/btcRelayTypes';

interface WatcherProps {
  issueId: string;
  confirmations: number;
}

export const useBtcWalletVaultIncomeWatcher = ({
  issueId,
  confirmations = 1,
}: WatcherProps): null | BTCTransaction => {
  const [btcTx, setBtcTx] = useState<BTCTransaction>(null);

  const loadBtcTx = useCallback(() => {
    BtcRelayClient.loadIssue(issueId)
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
