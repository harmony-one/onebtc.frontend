import { BcoinBTCTx, loadWalletTxList } from '../../services/bitcoin';
import { useCallback, useEffect, useState } from 'react';

interface WatcherProps {
  bitcoinAddress: string;
  confirmations: number;
}

export const useBtcTxWatcher = ({
  bitcoinAddress,
  confirmations = 1,
}: WatcherProps): null | BcoinBTCTx => {
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState<BcoinBTCTx | null>(null);
  const [finished, setFinished] = useState(false);

  const load = useCallback(() => {
    return loadWalletTxList(bitcoinAddress)
      .then(result => {
        if (result.length > 0) {
          setResult(result[0]);
          if (result[0] && result[0].confirmations >= confirmations) {
            setFinished(true);
          }
        }
      })
      .catch(err => {
        console.log('### Error while load btc transaction', err);
      });
  }, [bitcoinAddress, confirmations]);

  const watcherRun = useCallback(() => {
    const timeout = counter > 0 ? 3 * 1000 : 0;
    return setTimeout(async () => {
      await load();
      setCounter(counter + 1);
    }, timeout);
  }, [counter, load]);

  useEffect(() => {
    let t: number;
    if (!finished) {
      t = watcherRun();
    }
    return () => {
      clearTimeout(t);
    };
  }, [watcherRun, counter, finished]);

  return result;
};
