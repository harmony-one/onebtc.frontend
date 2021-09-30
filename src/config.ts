export const config = {
  bitcoin: {
    waitConfirmations: parseInt(
      process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '2',
      10,
    ),
    bcoinHost: {
      // testnet: 'http://161.35.125.60',
      testnet: 'https://btc.test.hmny.io',
      // mainnet: 'https://btc.main.hmny.io/',
    },
    explorer: {
      testnet: {
        wallet: 'https://www.blockchain.com/btc-testnet/address/',
        transaction: 'https://www.blockchain.com/btc-testnet/tx/',
        block: 'https://www.blockchain.com/btc-testnet/block/',
      },
    },
  },
  oneBtcContract: '0x4593566d7DE8212fe94535163B2C07FEDC4fdA4c',
  wallets: {
    metamask: true,
    onewallet: false,
  },
} as const;
