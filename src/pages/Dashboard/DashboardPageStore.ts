import { action, computed, observable } from 'mobx';
import { btcRelayClient } from '../../modules/btcRelay/btcRelayClient';
import {
  IHistoryIssueItem,
  IHistoryVaultItem,
  IListContainer,
} from '../../../../onebtc.sdk.fork/lib/dashboard-api/interfaces';
import { dateFormat } from '../../utils';

class DashboardPageStore {
  @observable
  private _vaultHistory: IListContainer<IHistoryVaultItem> | null;

  @observable
  private _issueHistory: IListContainer<IHistoryIssueItem> | null;

  @action.bound
  async loadPageData() {
    this._vaultHistory = await btcRelayClient.loadHistoryVault();
    this._issueHistory = await btcRelayClient.loadHistoryIssue();
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

  @computed
  get issueChartData() {
    if (!this._issueHistory) {
      return [];
    }

    const len = this._issueHistory.content.length;

    const list = this._issueHistory.content.slice(len - 6, len - 1);

    return list.map(item => {
      return {
        date: dateFormat(item.date),
        issuedPerDay: item.amountPerDay / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get activeVaultCount() {
    if (this.vaultChartData.length > 0) {
      return this.vaultChartData[this.vaultChartData.length - 1].total;
    }

    return 0;
  }

  @computed
  get totalCollateral() {
    if (this.vaultChartData.length > 0) {
      return this.vaultChartData[
        this.vaultChartData.length - 1
      ].totalCollateral.toString();
    }

    return '0';
  }

  @computed
  get vaultChartData() {
    if (!this._vaultHistory) {
      return [];
    }

    const len = this._vaultHistory.content.length;

    const list = this._vaultHistory.content.slice(len - 6, len - 1);

    return list.map(item => {
      return {
        date: dateFormat(item.date),
        active: item.activeVaults,
        total: item.vaults,
        totalCollateral: item.totalCollateral / 1e18,
      };
    });
  }
}

export const dashboardPageStore = new DashboardPageStore();
