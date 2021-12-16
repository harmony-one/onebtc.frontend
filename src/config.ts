interface Config {
  network: 'mainnet' | 'testnet';
  isTestnet: boolean;
  bitcoin: {
    waitConfirmationsCount: number;
    btcNodeUrl: string;
    explorer: {
      wallet: string;
      transaction: string;
      block: string;
    };
  };
  harmony: {
    nodeUrl: string;
    dashboardUrl: string;
    oneBtcContract: string;
    explorer: {
      transaction: string;
      address: string;
    };
  };
  wallets: {
    metamask: boolean;
    onewallet: boolean;
  };
  vaultApp: {
    vaultHost: string;
  };
}

export const config: Config = {
  network: process.env.NETWORK as 'mainnet' | 'testnet',
  isTestnet: process.env.NETWORK === 'testnet',
  bitcoin: {
    waitConfirmationsCount: parseInt(
      process.env.BTC_WAIT_CONFIRMATIONS_COUNT || '2',
      10,
    ),
    btcNodeUrl: process.env.BTC_NODE_URL,
    explorer: {
      wallet: process.env.BTC_EXPLORER_WALLET,
      transaction: process.env.BTC_EXPLORER_TX,
      block: process.env.BTC_EXPLORER_BLOCK,
    },
  },
  harmony: {
    nodeUrl: process.env.HMY_NODE_URL,
    oneBtcContract: process.env.ONE_BTC_CONTRACT_ADDRESS,
    dashboardUrl: process.env.DASHBOARD_URL,
    explorer: {
      transaction: process.env.HMY_EXPLORER_TX,
      address: process.env.HMY_EXPLORER_ADDRESS,
    },
  },
  wallets: {
    metamask: true,
    onewallet: true,
  },
  vaultApp: {
    vaultHost: process.env.VAULT_CLIENT_HOST || `${window.origin}/api`,
  },
} as const;

console.log('### config', config);
