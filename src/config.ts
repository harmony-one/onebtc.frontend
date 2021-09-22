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
      },
    },
  },
  oneBtcContract: '0xdd14648e3b112e582c76ae04c54d1cf89c7c131d',
  wallets: {
    metamask: true,
    onewallet: false,
  },
} as const;
