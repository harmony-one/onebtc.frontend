export const config = {
  bitcoin: {
    waitConfirmations:
      parseInt(process.env.BITCOINT_WAIT_CONFIRMATIONS_COUNT || '1', 10) || 1,
  },
} as const;
