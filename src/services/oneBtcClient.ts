import * as onebtcSdk from 'onebtc.sdk';

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
      nodeURL: 'https://api.s0.b.hmny.io',
      chainId: 2,
      contractAddress: '0xaA690F66E0953C355D4dB30Ff6e646cd357002C3',
      gasLimit: 6721900,
    });
  }

  if (wallet === 'onewallet') {
    clients[wallet] = await onebtcSdk.getHmyClient({
      sdk: 'harmony',
      nodeURL: 'https://api.s0.b.hmny.io',
      chainId: 2,
      contractAddress: '0xaA690F66E0953C355D4dB30Ff6e646cd357002C3',
      gasLimit: 6721900,
    });
  }

  return clients[wallet];
}
