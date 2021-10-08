import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { ActionModals } from './components/ActionModals';
import { IssuePage } from './pages/Issue/IssuePage';
import { SandBoxPage } from './pages/Sandbox/SandBoxPage';
import { RedeemPage } from './pages/Redeem/RedeemPage';
import { TransferPage } from './pages/Transfer/TransferPage';
import { routes } from './constants/routes';
import { WatcherBalance } from './components/WatcherBalance';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { DashboardRelayPage } from './pages/DashboardRelay/DashboardRelayPage';
import { WatcherBtcRelay } from './modules/btcRelay/WatcherBtcRelay';
import { WatcherBTCNode } from './modules/bcoin/WatcherBTCNode';
import { DashboardIssuesPage } from './pages/DashboardIssues/DashboardIssuesPage';
import { DashboardRedeemsPage } from './pages/DashboardRedeems/DashboardRedeemsPage';
import { DashboardVaultsPage } from './pages/DashboardVaults/DashboardVaultsPage';
import { DashboardVaultDetailsPage } from './pages/DashboardVaultDetails/DashboardVaultDetailsPage';

const App: React.FC = () => (
  <Providers>
    <Switch>
      <Route exact path={routes.issue} component={IssuePage} />
      <Route exact path={routes.redeem} component={RedeemPage} />
      <Route exact path={routes.transfer} component={TransferPage} />
      <Route exact path={routes.sandbox} component={SandBoxPage} />
      <Route exact path={routes.dashboard} component={DashboardPage} />
      <Route
        exact
        path={routes.dashboardRelay}
        component={DashboardRelayPage}
      />
      <Route
        exact
        path={routes.dashboardIssue}
        component={DashboardIssuesPage}
      />
      <Route
        exact
        path={routes.dashboardRedeem}
        component={DashboardRedeemsPage}
      />
      <Route
        exact
        path={routes.dashboardVault}
        component={DashboardVaultsPage}
      />
      <Route
        exact
        path={routes.dashboardVaultDetails}
        component={DashboardVaultDetailsPage}
      />
      <Redirect to={routes.issue} />
    </Switch>
    <WatcherBalance />
    <WatcherBtcRelay />
    <WatcherBTCNode />
    <ActionModals />
    <GlobalStyle theme={...baseTheme as any} />
  </Providers>
);

export default hot(App);
