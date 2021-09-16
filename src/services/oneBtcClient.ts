import * as onebtcSdk from 'onebtc.sdk';

let client: onebtcSdk.IHmyClient = null;

export async function getHmyClient() {
  if (client) {
    return client;
  }

  // new 0xBffa908aC951eD4fa224bd28f1291280E4220825
  // old 0x45b24bE9F317054B4D5972E9d685f6e403772f6b
  const hmyClient = await onebtcSdk.getHmyClient({
    sdk: 'web3',
    nodeURL: 'https://api.s0.b.hmny.io',
    chainId: 2,
    contractAddress: '0xBffa908aC951eD4fa224bd28f1291280E4220825',
    gasLimit: 6721900,
  });

  client = hmyClient;
  return hmyClient;
}
