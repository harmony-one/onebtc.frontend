import { config } from '../../config';
import { BTCNodeClient } from 'onebtc.sdk/lib/btcNode';

export interface BTCNodeInfo {
  chain: {
    height: number;
  };
}

export interface BTCTx {
  hash: string;
  confirmations: number;
  outputs: { value: number; script: string; address: string }[];
}

export const btcNodeClient = new BTCNodeClient(
  config.bitcoin.btcNodeUrl.testnet,
);
