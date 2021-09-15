import React from 'react';
import { cutText } from '../services/cutText';

interface Props {
  txHash: string;
}

const LinkHarmonyTx: React.FC<Props> = ({ txHash }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://explorer.pops.one/tx/${txHash}`}
    >
      {cutText(txHash)}
    </a>
  );
};

export default LinkHarmonyTx;
