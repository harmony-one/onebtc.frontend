import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { generatePath } from 'react-router';
import { routes } from '../constants/routes';

export default class CustomRouterStore extends RouterStore {
  constructor() {
    super();
    const browserHistory = createBrowserHistory();

    this.history = syncHistoryWithStore(browserHistory, this);
  }

  goToIssue(issueId?: string) {
    const path = generatePath(routes.issue, { issueId });
    this.push(path);
  }

  goToIssueModal(issueId: string, modal: 'deposit' | 'details') {
    const path = generatePath(routes.issue, { issueId, modal });
    this.push(path);
  }

  gotToRedeemModal(redeemId: string, modal: 'withdraw' | 'details') {
    const path = generatePath(routes.redeem, { redeemId, modal });
    this.push(path);
  }
}
