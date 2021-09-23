import { BcoinBTCTx, loadWalletTxList } from '../services/bitcoin';
import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';

interface WatcherProps {
  bitcoinAddress: string;
  amount: number;
  confirmations: number;
}

export const useBtcWalletIncomeWatcher = ({
  bitcoinAddress,
  amount,
  confirmations = 1,
}: WatcherProps): null | BcoinBTCTx => {
  const [btcTx, setBtcTx] = useState<BcoinBTCTx>(null);

  const loadBtcTx = useCallback(() => {
    loadWalletTxList(bitcoinAddress)
      .then(btcTxList => {
        const tx = btcTxList.find(tx => {
          const o = tx.outputs.find(output => {
            return output.value === amount;
          });

          return !!o;
        });

        if (tx) {
          setBtcTx(tx);
        }
      })
      .catch(err => {
        console.log('### Error while load btc transaction', err);
      });
  }, [amount, bitcoinAddress]);

  const [stopInterval] = useInterval({ callback: loadBtcTx, timeout: 5000 });

  useEffect(() => {
    if (btcTx && btcTx.confirmations >= confirmations) {
      stopInterval();
    }
  }, [confirmations, btcTx, stopInterval]);

  return btcTx;
};
