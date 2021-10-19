export const config = {
  bitcoin: {
    waitConfirmations: parseInt(
      process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '2',
      10,
    ),
    btcNodeUrl: {
      // testnet: 'http://161.35.125.60',
      testnet: 'https://btc2.test.hmny.io',
      // mainnet: 'https://btc.main.hmny.io/',
    },
    relayerHost: {
      testnet: 'https://relayer.btc.test.hmny.io',
    },
    explorer: {
      testnet: {
        wallet: 'https://www.blockchain.com/btc-testnet/address/',
        transaction: 'https://www.blockchain.com/btc-testnet/tx/',
        block: 'https://www.blockchain.com/btc-testnet/block/',
      },
    },
  },
  harmony: {
    explorer: {
      testnet: {
        transaction: 'https://explorer.pops.one/tx/',
        address: 'https://explorer.pops.one/address/',
      },
    },
  },
  oneBtcContract: {
    testnet: '0x2a9B7F9013E701AA71fE050eA9686BbB49E0D105',
  },
  wallets: {
    metamask: true,
    onewallet: true,
  },
} as const;
