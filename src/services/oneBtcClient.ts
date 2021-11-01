import * as onebtcSdk from 'onebtc.sdk';
import { config } from '../config';

let clients: Record<'onewallet' | 'metamask', onebtcSdk.IHmyClient> = {
  metamask: null,
  onewallet: null,
};

export async function getOneBTCClient(wallet: 'metamask' | 'onewallet') {
  if (clients[wallet]) {
    return clients[wallet];
  }

  // new 0xBffa908aC951eD4fa224bd28f1291280E4220825
  // old 0x45b24bE9F317054B4D5972E9d685f6e403772f6b
  if (wallet === 'metamask') {
    clients[wallet] = await onebtcSdk.getHmyClient({
      sdk: 'web3',
      nodeURL: 'https://api.s0.backup1.b.hmny.io',
      btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
      chainId: 2,
      contractAddress: config.oneBtcContract.testnet,
      gasLimit: 6721900,
    });
  }

  if (wallet === 'onewallet') {
    clients[wallet] = await onebtcSdk.getHmyClient({
      sdk: 'harmony',
      nodeURL: 'https://api.s0.backup1.b.hmny.io',
      chainId: 2,
      btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
      contractAddress: config.oneBtcContract.testnet,
      gasLimit: 6721900,
    });
  }

  return clients[wallet];
}
