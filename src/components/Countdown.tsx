import React, { useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import moment from 'moment';

interface Props {
  endTimestamp: number;
}

export const Countdown: React.FC<Props> = React.memo(({ endTimestamp }) => {
  const [duration, setDuration] = useState(moment.duration());
  const [endTime] = useState(endTimestamp);

  useInterval({
    timeout: 1000,
    callback: () => {
      const end = moment(endTime);
      const diffTime = end.diff(moment());
      const duration = moment.duration(diffTime);
      setDuration(duration);
    },
  });

  const days = duration.days(),
    hrs = duration.hours(),
    mins = duration.minutes(),
    secs = duration.seconds();

  const texts = ['', '', '', `${secs} seconds`];

  if (Math.abs(days) > 0) {
    texts[0] = `${days} day,`;
  }

  if (Math.abs(hrs) > 0) {
    texts[1] = `${hrs} hour,`;
  }

  if (Math.abs(hrs) > 0 || mins > 0) {
    texts[2] = `${mins} mins, and`;
  }

  return <>{texts.join(' ')}</>;
});

Countdown.displayName = 'Countdown';
