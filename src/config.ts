export enum ConfigType {
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
}

interface dynamicConfig {
  hmyNodeUrl: string;
  btcNodeUrl: string;
  oneBtcContract: string;
}

interface Config {
  bitcoin: {
    waitConfirmations: number;
    btcNodeUrl: string;
    explorer: {
      wallet: string;
      transaction: string;
      block: string;
    };
  };
  harmony: {
    nodeUrl: string;
    dashboardHost: string;
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
}

const configTestnet: Config = {
  bitcoin: {
    waitConfirmations: parseInt(
      process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '2',
      10,
    ),
    btcNodeUrl: 'https://btc2.test.hmny.io',
    explorer: {
      wallet: 'https://www.blockchain.com/btc-testnet/address/',
      transaction: 'https://www.blockchain.com/btc-testnet/tx/',
      block: 'https://www.blockchain.com/btc-testnet/block/',
    },
  },
  harmony: {
    nodeUrl: process.env.HMY_NODE_URL,
    oneBtcContract: process.env.ONE_BTC_CONTRACT_ADDRESS,
    dashboardHost: 'https://dashboard.btc.test.hmny.io',
    explorer: {
      transaction: 'https://explorer.pops.one/tx/',
      address: 'https://explorer.pops.one/address/',
    },
  },
  wallets: {
    metamask: true,
    onewallet: true,
  },
};

const configMainnet: Config = {
  bitcoin: {
    waitConfirmations: parseInt(
      process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '10',
      10,
    ),
    btcNodeUrl: 'https://btc2.test.hmny.io',
    explorer: {
      wallet: 'https://www.blockchain.com/btc/address/',
      transaction: 'https://www.blockchain.com/btc/tx/',
      block: 'https://www.blockchain.com/btc/block/',
    },
  },
  harmony: {
    nodeUrl: process.env.HMY_NODE_URL,
    oneBtcContract: process.env.ONE_BTC_CONTRACT_ADDRESS,
    dashboardHost: 'https://dashboard.btc.test.hmny.io',
    explorer: {
      transaction: 'https://explorer.harmony.one/tx/',
      address: 'https://explorer.harmony.one/address/',
    },
  },
  wallets: {
    metamask: true,
    onewallet: true,
  },
};

const configMap = {
  testnet: configTestnet,
  mainnet: configMainnet,
};

export const config: Config = {
  bitcoin: {
    waitConfirmations: parseInt(
      process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '2',
      10,
    ),
    btcNodeUrl: 'https://btc2.test.hmny.io',
    explorer: {
      wallet: 'https://www.blockchain.com/btc-testnet/address/',
      transaction: 'https://www.blockchain.com/btc-testnet/tx/',
      block: 'https://www.blockchain.com/btc-testnet/block/',
    },
  },
  harmony: {
    nodeUrl: process.env.HMY_NODE_URL,
    oneBtcContract: process.env.ONE_BTC_CONTRACT_ADDRESS,
    dashboardHost: 'https://dashboard.btc.test.hmny.io',
    explorer: {
      transaction: 'https://explorer.pops.one/tx/',
      address: 'https://explorer.pops.one/address/',
    },
  },
  wallets: {
    metamask: true,
    onewallet: true,
  },
} as const;

export const getConfig = (type: ConfigType): Config => {
  return configMap[type];
};
