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

const HOST = config.bitcoin.btcNodeUrl.testnet;

export class BtcNodeClient {
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

  static loadFee = async (): Promise<number> => {
    const response = await agent.get(`${HOST}/fee`);
    return response.body.rate;
  };
}
