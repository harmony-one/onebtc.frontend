import * as React from 'react';
import * as s from './Spinner.styl';

export const Spinner: React.FC<React.SVGAttributes<SVGElement> & {
  boxSize?: number;
}> = props => {
  const boxSize = props.boxSize || 16;
  const radius = boxSize / 2 - 1;
  const middle = boxSize / 2;
  return (
    <div className={s.spinnerContainer}>
      <svg
        viewBox={`0 0 ${boxSize} ${boxSize}`}
        className={s.spinner}
        {...props}
      >
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,173,232,1)" />
          <stop offset="100%" stop-color="rgba(0,232,162,1)" />
        </linearGradient>
        <circle
          r={radius}
          cx={middle}
          cy={middle}
          strokeWidth="1"
          fill="none"
          stroke={props.color || 'url(#linear)'}
        />
      </svg>
    </div>
  );
};
