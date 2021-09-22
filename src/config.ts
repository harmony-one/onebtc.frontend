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
  },
  oneBtcContract: '0x976bF816C5D9644e44d22bf3e308e49ea627f8c0',
} as const;
