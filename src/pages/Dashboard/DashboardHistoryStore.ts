import { action, computed, observable } from 'mobx';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import {
  IHistoryIssueItem,
  IHistoryVaultItem,
  IListContainer,
} from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { dateFormat } from '../../utils';
import { getHmyBalance } from '../../services/hmyClient';
import utils from 'web3-utils';

class DashboardPageStore {
  @observable
  private _vaultHistory: IListContainer<IHistoryVaultItem> | null;

  @observable
  private _issueHistory: IListContainer<IHistoryIssueItem> | null;

  @observable
  private _redeemHistory: IListContainer<IHistoryIssueItem> | null;

  @observable capacity = '0';

  @action.bound
  async loadData() {
    this.loadIssuesData();
    this.loadVaultData();
    this.loadRedeemsData();
    this.loadCapacity();
  }

  @action.bound
  async loadCapacity() {
    const response = await getHmyBalance(
      '0xdc54046c0451f9269fee1840aec808d36015697d',
    );

    this.capacity = utils.fromWei(response.result);
  }

  @action.bound
  async loadVaultData() {
    this._vaultHistory = await dashboardClient.loadHistoryVault();
  }

  @action.bound
  async loadIssuesData() {
    this._issueHistory = await dashboardClient.loadHistoryIssue();
  }

  @action.bound
  async loadRedeemsData() {
    this._redeemHistory = await dashboardClient.loadHistoryRedeem();
  }

  @computed
  get issuedToday() {
    if (!this.issueChartData.length) {
      return 0;
    }

    return (
      this.issueChartData[this.issueChartData.length - 1].issuedPerDay / 1e8
    );
  }

  get issuedTotal() {
    if (!this.issueChartData.length) {
      return 0;
    }

    return this.issueChartData[this.issueChartData.length - 1].total;
  }

  get redeemedTotal() {
    if (!this.redeemChartData.length) {
      return 0;
    }

    return this.redeemChartData[this.redeemChartData.length - 1].total;
  }

  @computed
  get issueChartData() {
    if (!this._issueHistory) {
      return [];
    }

    return this._issueHistory.content.reverse().map(item => {
      return {
        x: dateFormat(item.date),
        issuedPerDay: item.amountPerDay / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get redeemedToday() {
    if (!this.redeemChartData.length) {
      return 0;
    }

    return (
      this.redeemChartData[this.redeemChartData.length - 1].redeemedPerDay / 1e8
    );
  }

  @computed
  get redeemChartData() {
    if (!this._redeemHistory) {
      return [];
    }

    return this._redeemHistory.content.reverse().map(item => {
      return {
        x: dateFormat(item.date),
        redeemedPerDay: item.amountPerDay / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get activeVaultCount() {
    if (this._vaultHistory && this._vaultHistory.content.length) {
      const len = this._vaultHistory.content.length;

      return this._vaultHistory.content[len - 1].activeVaults;
    }

    return 0;
  }

  @computed
  get totalCollateral() {
    if (this._vaultHistory && this._vaultHistory.content.length) {
      const len = this._vaultHistory.content.length;

      return this._vaultHistory.content[len - 1].totalCollateral / 1e18;
    }

    return '0';
  }

  @computed
  get vaultActivityChart() {
    if (!this._vaultHistory) {
      return [];
    }

    const list = this._vaultHistory.content;

    return list.map(item => {
      return {
        x: dateFormat(item.date),
        active: item.activeVaults,
        total: item.vaults,
      };
    });
  }

  @computed
  get vaultTotalLockedChart() {
    if (!this._vaultHistory) {
      return [];
    }

    const list = this._vaultHistory.content;

    return list.map(item => {
      return {
        x: dateFormat(item.date),
        y: item.totalCollateral / 1e18,
      };
    });
  }
}

export const dashboardHistoryStore = new DashboardPageStore();
