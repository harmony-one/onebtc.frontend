import { IStores } from 'stores';
import Web3 from 'web3';

declare global {
  interface Window {
    stores?: IStores;
    web3?: Web3;
    onewallet?: {
      isOneWallet: boolean;
      version: string;
      blockchain: string;
      chain_id: number;
      chain_url: string;
      net_version: number;
      signTransaction: (arg: unknown) => unknown;
      getAccount: () => Promise<{ name: string; address: string }>;
    };
  }
}
