import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import { btcRelayClient } from '../modules/btcRelay/btcRelayClient';
import { BTCTx } from 'onebtc.sdk/lib/btcNode/types';

interface WatcherProps {
  redeemId: string;
  confirmations: number;
}

export const useBtcWalletIncomeWatcher = ({
  redeemId,
  confirmations = 1,
}: WatcherProps): null | BTCTx => {
  const [btcTx, setBtcTx] = useState<BTCTx>(null);

  const loadBtcTx = useCallback(() => {
    btcRelayClient
      .loadRedeem(redeemId)
      .then(redeem => {
        if (redeem.btcTx) {
          setBtcTx(redeem.btcTx);
        }
      })
      .catch(err => {
        console.log('### Error while load btc transaction', err);
      });
  }, [redeemId]);

  const [stopInterval] = useInterval({ callback: loadBtcTx, timeout: 5000 });

  useEffect(() => {
    if (btcTx && btcTx.confirmations >= confirmations) {
      stopInterval();
    }
  }, [confirmations, btcTx, stopInterval]);

  return btcTx;
};
