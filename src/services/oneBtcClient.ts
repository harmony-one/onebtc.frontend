import * as onebtcSdk from 'onebtc.sdk';
import { OneBTCClientWeb3 } from 'onebtc.sdk/lib/blockchain/hmy/OneBTCClientWeb3';
import { OneBTCClientHmy } from 'onebtc.sdk/lib/blockchain/hmy/OneBTCClientHmy';
import { dashboardClient } from '../modules/dashboard/dashboardClient';

interface Clients {
  metamask: OneBTCClientWeb3 | null;
  onewallet: OneBTCClientHmy | null;
}

const clients: Clients = {
  metamask: null,
  onewallet: null,
};

export async function getOneBTCClient(wallet: 'metamask' | 'onewallet') {
  if (clients[wallet]) {
    return clients[wallet];
  }

  const dashboardConfig = await dashboardClient.loadDashboardConfig();

  if (wallet === 'metamask') {
    clients[wallet] = await onebtcSdk.createClientWeb3({
      useMetamask: true,
      nodeURL: dashboardConfig.relayerClient.hmyNodeUrl,
      btcNodeUrl: dashboardConfig.relayerClient.btcNodeUrl,
      contractAddress: dashboardConfig.mainEvents.contractAddress,
      rewardContractAddress: '0x2bB7642EcbEC83Aa4D5B16A15AB8711E21c74005',
      chainId: 2,
      gasLimit: 6721900,
    });
  }

  if (wallet === 'onewallet') {
    clients[wallet] = await onebtcSdk.createClientHmy({
      useOneWallet: true,
      nodeURL: dashboardConfig.relayerClient.hmyNodeUrl,
      btcNodeUrl: dashboardConfig.relayerClient.btcNodeUrl,
      contractAddress: dashboardConfig.mainEvents.contractAddress,
      rewardContractAddress: '0x2bB7642EcbEC83Aa4D5B16A15AB8711E21c74005',
      chainId: 2,
      gasLimit: 6721900,
    });
  }

  return clients[wallet];
}
