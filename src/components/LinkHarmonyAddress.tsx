import React from 'react';
import { cutText } from '../services/cutText';

interface Props {
  address: string;
}

const LinkHarmonyAddress: React.FC<Props> = ({ address = '' }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://explorer.pops.one/address/${address}`}
    >
      {cutText(address)}
    </a>
  );
};

export default LinkHarmonyAddress;
