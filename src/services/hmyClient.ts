import Web3 from 'web3';
const { Harmony } = require('@harmony-js/core');
const { ChainType } = require('@harmony-js/utils');

export const getHmyBalance = address => {
  const hmy = new Harmony(
    // let's assume we deploy smart contract to this end-point URL
    process.env.HMY_NODE_URL,
    {
      chainType: ChainType.Harmony,
      chainId: Number(process.env.HMY_CHAIN_ID),
    },
  );

  const web3URL = window.web3
    ? window.web3.currentProvider
    : process.env.HMY_NODE_URL;

  const hmyWeb3 = new Web3(web3URL);

  return hmy.blockchain.getBalance({ address });
};
