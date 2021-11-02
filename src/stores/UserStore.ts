import { action, autorun, computed, observable } from 'mobx';
import { IStores } from 'stores';
import { statusFetching } from '../constants';
import detectEthereumProvider from '@metamask/detect-provider';
import { getHmyBalance } from '../services/hmyClient';
import { StoreConstructor } from './core/StoreConstructor';
import * as agent from 'superagent';
import { getOneBTCClient } from '../services/oneBtcClient';
import { ConnectWalletModal } from '../components/Head/components/ConnectWalletModal';

const Web3 = require('web3');

export class UserStoreEx extends StoreConstructor {
  public stores: IStores;
  @observable public isAuthorized: boolean;
  public status: statusFetching;

  @observable error: string = '';
  @observable public isMetaMask = false;
  private provider: any;

  private onewallet: any;
  @observable public isOneWallet = false;

  @observable public sessionType: 'onewallet' | 'metamask';
  @observable public address: string;

  @observable public balance: string = '0';

  @observable public oneRate = 0;
  @observable public btcRate = 0;
  @observable public oneBtcRate = 0;

  @observable public isInfoReading = false;
  @observable public isInfoNewReading = false;

  @observable metamaskChainId = 0;

  @observable public oneBTCBalance = 0;

  @observable public oneBtcClient = null;

  constructor(stores) {
    super(stores);

    setInterval(async () => {
      // @ts-ignore
      this.isOneWallet = window.onewallet && window.onewallet.isOneWallet;
      // @ts-ignore
      this.onewallet = window.onewallet;
    }, 3000);

    // setInterval(() => {
    //   const newBalance = this.oneBTCBalance ? this.oneBTCBalance - 1 : 10;
    //   console.log('### newBalance', newBalance);
    //   this.setBalance(newBalance / 1e8);
    // }, 3000);

    this.getRates();

    // @ts-ignore
    this.isOneWallet = window.onewallet && window.onewallet.isOneWallet;
    // @ts-ignore
    this.onewallet = window.onewallet;

    const session = localStorage.getItem('harmony_session');

    const sessionObj = JSON.parse(session);

    if (sessionObj && sessionObj.isInfoReading) {
      this.isInfoReading = sessionObj.isInfoReading;
    }

    if (sessionObj && sessionObj.isInfoNewReading2) {
      this.isInfoNewReading = sessionObj.isInfoNewReading2;
    }

    if (sessionObj && sessionObj.address) {
      this.address = sessionObj.address;
      this.sessionType = sessionObj.sessionType;

      if (this.sessionType === 'metamask') {
        // const web3 = new Web3(window.web3.currentProvider);
        // web3.eth.net.getId().then(id => (this.metamaskChainId = id));

        if (sessionObj.address) {
          this.signInMetamask();
        }
      }

      this.isAuthorized = true;
    }

    autorun(() => {
      if (this.isNetworkActual && this.isMetamask) {
        this.signInMetamask();
      }
    });
  }

  @action
  public updateBalance() {
    if (this.isAuthorized) {
      this.loadOneBTCBalance();
      this.getBalances();
    }
  }

  @computed public get isNetworkActual() {
    switch (process.env.NETWORK) {
      case 'testnet':
        return Number(this.metamaskChainId) === 1666700000;

      case 'mainnet':
        return Number(this.metamaskChainId) === 1666600000;
    }

    return false;
  }

  @computed public get isMetamask() {
    return this.sessionType === 'metamask';
  }

  @action.bound
  setError(error: string) {
    this.error = error;
    this.isAuthorized = false;
  }

  @action.bound
  handleAccountsChanged(...args) {
    if (args[0].length === 0) {
      return this.setError('Please connect to MetaMask');
    } else {
      this.address = args[0][0];
      this.syncLocalStorage();
    }
  }

  @action.bound
  public async signInMetamask(isNew = false) {
    try {
      this.error = '';

      const provider = await detectEthereumProvider();

      // @ts-ignore
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }

      if (!provider) {
        return this.setError('Metamask not found');
      }

      this.provider = provider;

      this.provider.on('accountsChanged', this.handleAccountsChanged);

      this.provider.on(
        'chainIdChanged',
        chainId => (this.metamaskChainId = chainId),
      );
      this.provider.on(
        'chainChanged',
        chainId => (this.metamaskChainId = chainId),
      );
      this.provider.on(
        'networkChanged',
        chainId => (this.metamaskChainId = chainId),
      );

      this.provider.on('disconnect', () => {
        this.isAuthorized = false;
        this.address = null;
      });

      this.provider
        .request({ method: 'eth_requestAccounts' })
        .then(async params => {
          const web3 = new Web3(window.web3.currentProvider);
          this.metamaskChainId = await web3.eth.net.getId();

          this.sessionType = 'metamask';

          this.handleAccountsChanged(params);

          if (isNew) {
            await this.provider.request({
              method: 'wallet_requestPermissions',
              params: [
                {
                  eth_accounts: {},
                },
              ],
            });
          }

          this.isAuthorized = true;
          // this.metamaskNetwork = await web3.eth.net.getNetworkType()

          await this.stores.configStore.loadConfig();

          this.oneBtcClient = await getOneBTCClient(this.sessionType);
        })
        .catch(err => {
          if (err.code === 4001) {
            this.isAuthorized = false;
            this.address = null;
            this.syncLocalStorage();
            return this.setError('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
    } catch (e) {
      return this.setError(e.message);
    }
  }

  @action public getBalances = async () => {
    if (this.address && (!this.isMetamask || this.isNetworkActual)) {
      try {
        let res = await getHmyBalance(this.address);
        this.balance = res && res.result;
      } catch (e) {
        console.error(e);
      }
    }
  };

  @action.bound
  public loadOneBTCBalance = async () => {
    const hmyClient = await getOneBTCClient(this.sessionType);

    this.oneBTCBalance = await hmyClient.balanceOf(this.address);
  };

  @action signInOneWallet = async () => {
    // @ts-ignore
    if (window.onewallet) {
      // @ts-ignore
      const account = await window.onewallet.getAccount();

      this.address = account.address;
      this.isOneWallet = true;
      this.isAuthorized = true;
      this.sessionType = 'onewallet';
      this.syncLocalStorage();
    }
  };

  @action public signOut() {
    if (this.isOneWallet) {
      this.isAuthorized = false;

      return this.onewallet
        .forgetIdentity()
        .then(() => {
          this.sessionType = null;
          this.address = null;
          this.isAuthorized = false;

          this.syncLocalStorage();

          return Promise.resolve();
        })
        .catch(err => {
          console.error('### error signOut', err.message);
        });
    }
  }

  private syncLocalStorage() {
    localStorage.setItem(
      'harmony_session',
      JSON.stringify({
        address: this.address,
        sessionType: this.sessionType,
        isInfoReading: this.isInfoReading,
        isInfoNewReading2: this.isInfoNewReading,
      }),
    );
  }

  @action public async getRates() {
    let res = await agent.get(
      'https://api.binance.com/api/v1/ticker/24hr?symbol=ONEUSDT',
    );

    this.oneRate = res.body.lastPrice;

    res = await agent.get(
      'https://api.binance.com/api/v1/ticker/24hr?symbol=BTCUSDT',
    );

    this.btcRate = res.body.lastPrice;

    res = await agent.get(
      'https://api.binance.com/api/v1/ticker/24hr?symbol=ONEBTC',
    );

    this.oneBtcRate = res.body.lastPrice;
  }

  @action public async openConnectWalletModal() {
    this.stores.actionModals.open(ConnectWalletModal, {
      applyText: '',
      closeText: '',
      initData: {},
      onApply: () => {
        return Promise.resolve();
      },
      onClose: () => {
        return Promise.resolve();
      },
    });
  }
}
