import { BcoinBTCTx, loadWalletTxList } from '../services/bitcoin';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';

interface WatcherProps {
  bitcoinAddress: string;
  confirmations: number;
}

export const useBtcWalletVaultIncomeWatcher = ({
  bitcoinAddress,
  confirmations = 1,
}: WatcherProps): null | BcoinBTCTx => {
  const [btcTx, setBtcTx] = useState<BcoinBTCTx>(null);

  const loadBtcTx = useCallback(() => {
    loadWalletTxList(bitcoinAddress)
      .then(btcTxList => {
        if (btcTxList.length > 0) {
          setBtcTx(btcTxList[0]);
        }
      })
      .catch(err => {
        console.log('### Error while load btc transaction', err);
      });
  }, [bitcoinAddress]);

  const [stopInterval] = useInterval({ callback: loadBtcTx, timeout: 5000 });

  useEffect(() => {
    if (btcTx && btcTx.confirmations >= confirmations) {
      stopInterval();
    }
  }, [confirmations, btcTx, stopInterval]);

  return btcTx;
};
