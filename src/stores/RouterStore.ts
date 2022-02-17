import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { generatePath } from 'react-router';
import { routes } from '../constants/routePaths';

export default class CustomRouterStore extends RouterStore {
  constructor() {
    super();
    const browserHistory = createBrowserHistory();

    this.history = syncHistoryWithStore(browserHistory, this);
  }

  goTo(path: string, params: Record<string, string | number> = {}) {
    this.push(this.generatePath(path, params));
  }

  generatePath(route: string, params: Record<string, string | number> = {}) {
    return generatePath(route, params);
  }

  goToDashboardIssue(params: { issueId?: string; replace?: boolean }) {
    const { issueId, replace = false } = params;
    const path = generatePath(routes.dashboardIssue, { issueId });
    if (replace) {
      this.replace(path);
    }
    this.push(path);
  }

  goToDashboardRedeem(params: { redeemId?: string; replace?: boolean }) {
    const { redeemId, replace = false } = params;
    const path = generatePath(routes.dashboardRedeem, {
      redeemId,
    });
    if (replace) {
      this.replace(path);
    }
    this.push(path);
  }

  goToIssue(issueId?: string) {
    const path = generatePath(routes.issue, { issueId });
    this.push(path);
  }

  goToIssueModal(issueId: string, modal: 'deposit' | 'details') {
    const path = generatePath(routes.issue, { issueId, modal });
    this.push(path);
  }

  goToIssueModalM(issueId: string) {
    this.push(`${this.location.pathname}/issues/${issueId}`);
  }

  goToRedeemModalM(redeemId: string) {
    this.push(`${this.location.pathname}/redeems/${redeemId}`);
  }

  gotToRedeemModal(redeemId: string, modal: 'withdraw' | 'details') {
    const path = generatePath(routes.redeem, { redeemId, modal });
    this.push(path);
  }

  goToVault(vaultId: string) {
    const path = generatePath(routes.dashboardVaultDetails, { vaultId });
    this.push(path);
  }
}
