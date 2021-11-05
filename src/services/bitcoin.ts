import * as bitcoin from 'bitcoinjs-lib';
import { config } from '../config';

export const btcAddressHexToBech32 = (address: string) => {
  const prefix = config.isTestnet ? 'tb' : 'bc';
  return bitcoin.address.toBech32(
    Buffer.from(address.slice(2), 'hex'),
    0,
    prefix,
  );
};

export const btcAddressHexToBase58 = (address: string) => {
  return bitcoin.address.toBase58Check(Buffer.from(address.slice(2), 'hex'), 0);
};

export const btcAddressBech32ToHex = (address: string) => {
  return '0x' + bitcoin.address.fromBech32(address).data.toString('hex');
};

export const bitcoinToSatoshi = (amount: string | number) => {
  return Math.ceil(Number(amount) * 1e8);
};

export const satoshiToBitcoin = (amount: string | number) => {
  return Number(amount) / 1e8;
};
