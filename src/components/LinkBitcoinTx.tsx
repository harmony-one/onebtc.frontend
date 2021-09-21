import React from 'react';
import { cutText } from '../services/cutText';

interface Props {
  txHash: string;
  text?: string;
}

const LinkBitcoinTx: React.FC<Props> = ({ txHash = '', text }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.blockchain.com/btc-testnet/tx/${txHash}`}
    >
      {text || cutText(txHash)}
    </a>
  );
};

export default LinkBitcoinTx;
