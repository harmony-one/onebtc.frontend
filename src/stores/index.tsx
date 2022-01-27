import RouterStore from 'stores/RouterStore';
import { ActionModalsStore } from './ActionModalsStore';
import { UserStoreEx } from './UserStore';
import { createStoresContext } from './create-context';
import { IssuePageStore } from '../pages/Issue/IssuePageStore';
import { RedeemPageStore } from '../pages/Redeem/RedeemPageStore';
import { UITransactionsStore } from '../modules/uiTransaction/UITransactionsStore';
import { TransferPageStore } from '../pages/Transfer/TransferPageStore';
import { BtcRelayBlocksStore } from '../pages/DashboardRelay/BtcRelayBlocksStore';
import { BtcRelayStore } from '../modules/dashboard/BtcRelayStore';
import { BTCNodeStore } from '../modules/btcNode/BTCNodeStore';
import { IssueListStore } from '../pages/DashboardIssues/IssueListStore';
import { RedeemListStore } from '../pages/DashboardRedeems/RedeemListStore';
import { DashboardVaultsListStore } from '../pages/DashboardVaults/DashboardVaultsListStore';
import { VaultStore } from './VaultStore';
import { DashboardVaultDetailsStore } from '../pages/DashboardVaultDetails/DashboardVaultDetailsStore';
import { IssueStore } from './IssueStore';
import { RedeemStore } from './RedeemStore';
import { RatesStore } from './RatesStore';
import { VaultAppStore } from '../vaultApp/stores/VaultAppStore';
import { AdminConfigForm } from '../pages/admin/AdminConfigForm';
import { VaultListStore } from './VaultListStore';

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
  btcNodeStore?: BTCNodeStore;
  issueListStore?: IssueListStore;
  redeemListStore?: RedeemListStore;
  dashboardVaultListStore?: DashboardVaultsListStore;
  vaultStore?: VaultStore;
  issueStore?: IssueStore;
  redeemStore?: RedeemStore;
  dashboardVaultDetailsStore?: DashboardVaultDetailsStore;
  ratesStore?: RatesStore;
  adminConfigForm?: AdminConfigForm;
  vaultListStore?: VaultListStore;
  vaultApp?: {
    vaultAppStore?: VaultAppStore;
  };
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
stores.btcNodeStore = new BTCNodeStore(stores);
stores.issueListStore = new IssueListStore(stores);
stores.redeemListStore = new RedeemListStore(stores);
stores.dashboardVaultListStore = new DashboardVaultsListStore(stores);
stores.vaultStore = new VaultStore(stores);
stores.dashboardVaultDetailsStore = new DashboardVaultDetailsStore(stores);
stores.issueStore = new IssueStore(stores);
stores.redeemStore = new RedeemStore(stores);
stores.ratesStore = new RatesStore(stores);
stores.adminConfigForm = new AdminConfigForm(stores);
stores.vaultListStore = new VaultListStore(stores);

stores.vaultApp = {
  vaultAppStore: new VaultAppStore(stores),
};

if (!process.env.production) {
  window.stores = stores;
}

const { StoresProvider, useStores } = createStoresContext<typeof stores>();
export { StoresProvider, useStores };

export default stores;
