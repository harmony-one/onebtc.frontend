import React from 'react';

import * as s from './Button.styl';

interface Props {
  onClick: React.MouseEventHandler;
}

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button className={s.root} onClick={onClick}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
