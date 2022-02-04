import { useCallback, useEffect, useState } from 'react';

interface UseIntervalProps {
  callback: () => void;
  timeout?: number;
}

type ReturnType = [() => void, number, boolean];

export const useInterval = ({
  callback,
  timeout = 3000,
}: UseIntervalProps): ReturnType => {
  const [counter, setCounter] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    callback();
    setCounter(1);
  }, [callback]);

  const watcherRun = useCallback(() => {
    return setTimeout(() => {
      setCounter(counter + 1);
      callback();
    }, timeout);
  }, [counter, callback, timeout]);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    let t: number;
    if (isActive) {
      t = watcherRun();
    }
    return () => {
      clearTimeout(t);
    };
  }, [watcherRun, counter, isActive]);

  return [stop, counter, isActive];
};
