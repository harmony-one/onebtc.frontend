import * as bitcoin from 'bitcoinjs-lib';
import utils from 'web3-utils';
import agent from 'superagent';
import { issue_tx_mock } from 'onebtc.sdk/lib/helpers';
import { config } from '../config';

export const walletHexToBech32 = (address: string) => {
  return bitcoin.address.toBech32(
    Buffer.from(address.slice(2), 'hex'),
    0,
    'tb',
  );
};

export const walletHexToBase58 = (address: string) => {
  return bitcoin.address.toBase58Check(Buffer.from(address.slice(2), 'hex'), 0);
};

export const walletBech32ToHex = (address: string) => {
  return '0x' + bitcoin.address.fromBech32(address).data.toString('hex');
};

export const bitcoinToSatoshi = (amount: string | number) => {
  return Math.ceil(Number(amount) * 1e8);
};

export const satoshiToBitcoin = (amount: string | number) => {
  return Number(amount) / 1e8;
};

export const mockBitcoinTx = (
  entityId: string,
  vaultId: string,
  amount: number,
) => {
  const btcBlockNumberMock = 1000;
  const btcTxIndexMock = 2;
  const heightAndIndex = (btcBlockNumberMock << 32) | btcTxIndexMock;
  const headerMock = Buffer.alloc(0);
  const proofMock = Buffer.alloc(0);

  const btcTx = issue_tx_mock(
    // @ts-ignore
    utils.toBN(entityId),
    vaultId,
    amount,
  );

  return {
    heightAndIndex,
    headerMock,
    proofMock,
    btcTx,
  };
};

export interface BcoinBTCTx {
  hash: string;
  confirmations: number;
  outputs: { value: number; script: string; address: string }[];
}

export const loadWalletTxList = async (
  btcAddress: string,
): Promise<BcoinBTCTx[]> => {
  const HOST = config.bitcoin.bcoinHost.testnet;
  const API_URL = `${HOST}/tx/address/${btcAddress}`;
  const response = await agent.get(API_URL);

  return response.body;
};
