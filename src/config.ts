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
      testnet: 'https://dashboard.btc.test.hmny.io',
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
    testnet: '0x7172bF330D568132999c4B0ccd37a7B39AB0e722',
  },
  wallets: {
    metamask: true,
    onewallet: true,
  },
} as const;
