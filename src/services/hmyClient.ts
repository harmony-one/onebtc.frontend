import Web3 from 'web3';
const { Harmony } = require('@harmony-js/core');
const { ChainType } = require('@harmony-js/utils');

export const hmy = new Harmony(
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

export const hmyWeb3 = new Web3(web3URL);

export const getHmyBalance = address => {
  return hmy.blockchain.getBalance({ address });
};
