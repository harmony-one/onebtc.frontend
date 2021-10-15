import React from 'react';

interface Props {
  onClick?: () => void;
}

const style = { color: '#00ADE8', cursor: 'pointer' };

export const InputButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div style={style} onClick={onClick}>
      {children}
    </div>
  );
};

InputButton.displayName = 'InputButton';
