import { BcoinBTCTx } from '../services/bitcoin';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';
import BtcRelayClient from '../modules/btcRelay/btcRelayClient';

interface WatcherProps {
  redeemId: string;
  confirmations: number;
}

export const useBtcWalletIncomeWatcher = ({
  redeemId,
  confirmations = 1,
}: WatcherProps): null | BcoinBTCTx => {
  const [btcTx, setBtcTx] = useState<BcoinBTCTx>(null);

  const loadBtcTx = useCallback(() => {
    BtcRelayClient.loadRedeem(redeemId)
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
