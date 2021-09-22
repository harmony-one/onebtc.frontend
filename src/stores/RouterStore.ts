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

  goToIssue(issueTxHash?: string) {
    const path = generatePath(routes.issue, { issueTx: issueTxHash });
    this.push(path);
  }

  goToIssueModal(issueTxHash: string, modal: 'deposit' | 'details') {
    const path = generatePath(routes.issue, { issueTx: issueTxHash, modal });
    this.push(path);
  }
}
