import { action, computed, observable } from 'mobx';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import {
  IHistoryIssueItem,
  IHistoryVaultItem,
} from 'onebtc.sdk/lib/dashboard-api/interfaces';
import { dateFormat } from '../../utils';
import { getHmyBalance } from '../../services/hmyClient';
import utils from 'web3-utils';
import { HISTORY_INTERVAL } from 'onebtc.sdk';

class DashboardPageStore {
  @observable
  private _vaultHistory: IHistoryVaultItem[] | null;

  @observable
  private _issueHistory: IHistoryIssueItem[] | null;

  @observable
  private _issueWeeklyHistory: IHistoryIssueItem[] | null;

  @observable
  private _redeemWeeklyHistory: IHistoryIssueItem[] | null;

  @observable
  private _issueMonthlyHistory: IHistoryIssueItem[] | null;

  @observable
  private _redeemMonthlyHistory: IHistoryIssueItem[] | null;

  @observable
  private _redeemHistory: IHistoryIssueItem[] | null;

  @observable capacity = '0';

  @action.bound
  async loadData() {
    this.loadIssuesData();
    this.loadVaultData();
    this.loadRedeemsData();
    this.loadCapacity();
    this.loadIssuesWeeklyData();
    this.loadRedeemsWeeklyData();
    this.loadIssuesMonthlyData();
    this.loadRedeemsMonthlyData();
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
    const response = await dashboardClient.loadHistoryVault();
    this._vaultHistory = response.content;
  }

  @action.bound
  async loadIssuesData() {
    const response = await dashboardClient.loadHistoryIssue();
    this._issueHistory = response.content.reverse();
  }

  @action
  async loadIssuesWeeklyData() {
    const response = await dashboardClient.loadHistoryIssue({
      interval: HISTORY_INTERVAL.WEEK,
    });
    this._issueWeeklyHistory = response.content.reverse();
  }

  @action
  async loadIssuesMonthlyData() {
    const response = await dashboardClient.loadHistoryIssue({
      interval: HISTORY_INTERVAL.MONTH,
    });
    this._issueMonthlyHistory = response.content.reverse();
  }

  @action.bound
  async loadRedeemsData() {
    const response = await dashboardClient.loadHistoryRedeem();
    this._redeemHistory = response.content.reverse();
  }

  @action
  async loadRedeemsWeeklyData() {
    const response = await dashboardClient.loadHistoryRedeem({
      interval: HISTORY_INTERVAL.WEEK,
    });
    this._redeemWeeklyHistory = response.content.reverse();
  }

  @action
  async loadRedeemsMonthlyData() {
    const response = await dashboardClient.loadHistoryRedeem({
      interval: HISTORY_INTERVAL.MONTH,
    });
    this._redeemMonthlyHistory = response.content.reverse();
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

    return this._issueHistory.map(item => {
      return {
        x: dateFormat(item.date),
        issuedPerDay: item.amountPerDay / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get issueWeeklyChartData() {
    if (!this._issueWeeklyHistory) {
      return [];
    }

    return this._issueWeeklyHistory.map(item => {
      return {
        x: dateFormat(item.date),
        amountPerWeek: item.amountPerWeek / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get issueMonthlyChartData() {
    if (!this._issueMonthlyHistory) {
      return [];
    }

    return this._issueMonthlyHistory.map(item => {
      return {
        x: dateFormat(item.date),
        amountPerMonth: item.amountPerMonth / 1e8,
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

    return this._redeemHistory.map(item => {
      return {
        x: dateFormat(item.date),
        redeemedPerDay: item.amountPerDay / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get redeemWeeklyChartData() {
    if (!this._redeemWeeklyHistory) {
      return [];
    }

    return this._redeemWeeklyHistory.map(item => {
      return {
        x: dateFormat(item.date),
        amountPerWeek: item.amountPerWeek / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get redeemMonthlyChartData() {
    if (!this._redeemMonthlyHistory) {
      return [];
    }

    return this._redeemMonthlyHistory.map(item => {
      return {
        x: dateFormat(item.date),
        amountPerMonth: item.amountPerMonth / 1e8,
        total: item.total / 1e8,
      };
    });
  }

  @computed
  get activeVaultCount() {
    if (this._vaultHistory && this._vaultHistory.length) {
      const len = this._vaultHistory.length;

      return this._vaultHistory[len - 1].activeVaults;
    }

    return 0;
  }

  @computed
  get totalCollateral() {
    if (this._vaultHistory && this._vaultHistory.length) {
      const len = this._vaultHistory.length;

      return this._vaultHistory[len - 1].totalCollateral / 1e18;
    }

    return '0';
  }

  @computed
  get vaultActivityChart() {
    if (!this._vaultHistory) {
      return [];
    }

    return this._vaultHistory.map(item => {
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

    return this._vaultHistory.map(item => {
      return {
        x: dateFormat(item.date),
        y: item.totalCollateral / 1e18,
      };
    });
  }
}

export const dashboardHistoryStore = new DashboardPageStore();
