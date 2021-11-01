import * as onebtcSdk from 'onebtc.sdk';
import { config } from '../config';
import { OneBTCClientWeb3 } from 'onebtc.sdk/lib/blockchain/hmy/OneBTCClientWeb3';
import { OneBTCClientHmy } from 'onebtc.sdk/lib/blockchain/hmy/OneBTCClientHmy';

interface Clients {
  metamask: OneBTCClientWeb3 | null;
  onewallet: OneBTCClientHmy | null;
}

let clients: Clients = {
  metamask: null,
  onewallet: null,
};

export async function getOneBTCClient(wallet: 'metamask' | 'onewallet') {
  if (clients[wallet]) {
    return clients[wallet];
  }

  console.log('### config.', config.oneBtcContract.testnet);

  if (wallet === 'metamask') {
    clients[wallet] = await onebtcSdk.createClientWeb3({
      useMetamask: true,
      nodeURL: config.harmony.nodeUrl,
      btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
      contractAddress: config.oneBtcContract.testnet,
      chainId: 2,
      gasLimit: 6721900,
    });
  }

  if (wallet === 'onewallet') {
    clients[wallet] = await onebtcSdk.createClientHmy({
      useOneWallet: true,
      nodeURL: config.harmony.nodeUrl,
      btcNodeUrl: config.bitcoin.btcNodeUrl.testnet,
      contractAddress: config.oneBtcContract.testnet,
      chainId: 2,
      gasLimit: 6721900,
    });
  }

  return clients[wallet];
}
