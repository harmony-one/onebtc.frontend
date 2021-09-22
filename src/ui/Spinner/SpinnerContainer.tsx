import * as React from 'react';
import * as s from './SpinnerContainer.styl';

export const SpinnerContainer: React.FC<{
  boxSize?: number;
  className?: string;
}> = props => {
  const boxSize = props.boxSize || 16;
  const radius = boxSize / 2 - 1;
  const middle = boxSize / 2;
  return (
    <div className={s.root}>
      <div className={s.content}>{props.children}</div>
      <svg viewBox={`0 0 ${boxSize} ${boxSize}`} className={s.spinner}>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,173,232,1)" />
          <stop offset="75%" stopColor="rgba(0,232,162,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255, 1)" />
        </linearGradient>
        <circle
          r={radius}
          cx={middle}
          cy={middle}
          strokeWidth="1"
          fill="transparent"
          stroke="url(#linear)"
        />
      </svg>
    </div>
  );
};
