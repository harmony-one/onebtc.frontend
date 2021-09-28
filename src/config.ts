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
  oneBtcContract: '0x4A96FdAeA8Fd6064B1efC56753d01B866Ff14883',
  wallets: {
    metamask: true,
    onewallet: false,
  },
} as const;
