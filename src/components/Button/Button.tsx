import React from 'react';

import * as s from './Button.styl';
import cn from 'classnames';

interface Props {
  onClick: React.MouseEventHandler;
  fill: true | 'horizontal' | 'vertical';
}

export const Button: React.FC<Props> = ({ children, fill, onClick }) => {
  const classes = cn(s.root, {
    [s.fillHorizontal]: fill === 'horizontal' || fill === true,
    [s.fillVertical]: fill === 'vertical' || fill === true,
  });

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
