import RouterStore from 'stores/RouterStore';
import { ActionModalsStore } from './ActionModalsStore';
import { UserStoreEx } from './UserStore';
import { createStoresContext } from './create-context';
import { IssuePageStore } from '../pages/Issue/IssuePageStore';
import { RedeemPageStore } from '../pages/Redeem/RedeemPageStore';
import { UITransactionsStore } from '../modules/uiTransaction/UITransactionsStore';
import { TransferPageStore } from '../pages/Transfer/TransferPageStore';
import { BtcRelayBlocksStore } from '../pages/DashboardRelay/BtcRelayBlocksStore';
import { BtcRelayStore } from '../modules/btcRelay/BtcRelayStore';
import { BcoinStore } from '../modules/bcoin/BcoinStore';
import { IssueListStore } from '../pages/DashboardIssues/IssueListStore';
import { RedeemListStore } from '../pages/DashboardRedeems/RedeemListStore';
import { VaultsListStore } from '../pages/DashboardVaults/VaultsListStore';

export interface IStores {
  routing?: RouterStore;
  actionModals?: ActionModalsStore;
  user?: UserStoreEx;
  issuePageStore?: IssuePageStore;
  redeemPageStore?: RedeemPageStore;
  transferPageStore?: TransferPageStore;
  uiTransactionsStore?: UITransactionsStore;
  relayBlocksStore?: BtcRelayBlocksStore;
  btcRelayStore?: BtcRelayStore;
  bcoinStore?: BcoinStore;
  issueListStore?: IssueListStore;
  redeemListStore?: RedeemListStore;
  vaultListStore?: VaultsListStore;
}

const stores: IStores = {};

stores.routing = new RouterStore();
stores.uiTransactionsStore = new UITransactionsStore(stores);
stores.issuePageStore = new IssuePageStore(stores);
stores.redeemPageStore = new RedeemPageStore(stores);
stores.transferPageStore = new TransferPageStore(stores);
stores.actionModals = new ActionModalsStore();
stores.user = new UserStoreEx(stores);
stores.relayBlocksStore = new BtcRelayBlocksStore(stores);
stores.btcRelayStore = new BtcRelayStore(stores);
stores.bcoinStore = new BcoinStore(stores);
stores.issueListStore = new IssueListStore(stores);
stores.redeemListStore = new RedeemListStore(stores);
stores.vaultListStore = new VaultsListStore(stores);

if (!process.env.production) {
  window.stores = stores;
}

const { StoresProvider, useStores } = createStoresContext<typeof stores>();
export { StoresProvider, useStores };

export default stores;
