export const config = {
  bitcoin: {
    waitConfirmations:
      parseInt(process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '1', 10) || 1,
  },
  oneBtcContract: '0x5eFCD3350C79334C860B1A5a4F8e80168f3A735d',
} as const;
