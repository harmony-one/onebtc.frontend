import React from 'react';
import { cutText } from '../services/cutText';
import { config } from '../config';

interface Props {
  address: string;
  text?: string;
}

const LinkBitcoinAddress: React.FC<Props> = ({ address = '', text }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`${config.bitcoin.explorer.testnet.wallet}${address}`}
    >
      {text || cutText(address)}
    </a>
  );
};

export default LinkBitcoinAddress;
