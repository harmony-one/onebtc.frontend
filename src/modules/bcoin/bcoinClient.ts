import { config } from '../../config';
import agent from 'superagent';

export interface IBcoinBasicInfo {
  chain: {
    height: number;
  };
}

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

const HOST = config.bitcoin.bcoinHost.testnet;

export class BcoinClient {
  static loadWalletTxList = async (
    btcAddress: string,
  ): Promise<BcoinBTCTx[]> => {
    const response = await agent.get(`${HOST}/tx/address/${btcAddress}`);

    return response.body;
  };

  static loadBasicInfo = async (): Promise<IBcoinBasicInfo> => {
    const response = await agent.get(`${HOST}`);
    return response.body;
  };
}
