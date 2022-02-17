import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { ActionModals } from './components/ActionModals';
import { IssuePage } from './pages/Issue/IssuePage';
import { RedeemPage } from './pages/Redeem/RedeemPage';
import { TransferPage } from './pages/Transfer/TransferPage';
import { routes } from './constants/routePaths';
import { WatcherBalance } from './components/WatcherBalance';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { DashboardRelayPage } from './pages/DashboardRelay/DashboardRelayPage';
import { WatcherDashboard } from './modules/dashboard/WatcherDashboard';
import { WatcherBTCNode } from './modules/btcNode/WatcherBTCNode';
import { DashboardIssuesPage } from './pages/DashboardIssues/DashboardIssuesPage';
import { DashboardRedeemsPage } from './pages/DashboardRedeems/DashboardRedeemsPage';
import { DashboardVaultsPage } from './pages/DashboardVaults/DashboardVaultsPage';
import { DashboardVaultDetailsPage } from './pages/DashboardVaultDetails/DashboardVaultDetailsPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TransactionsPage } from './pages/Transactions/TransactionsPage';
import { Disclaimer } from './components/DisclaimerWarning';
import { AdminHomePage } from './pages/admin/AdminHomePage';
import { SupportPage } from './pages/Support/SupportPage';
import { HelpPage } from './pages/Help/HelpPage';
import { MyVaultPage } from './pages/MyVault/MyVaultPage';

const App: React.FC = () => (
  <ErrorBoundary>
    <Providers>
      <Switch>
        <Route exact path={routes.issue} component={IssuePage} />
        <Route exact path={routes.redeem} component={RedeemPage} />
        <Route exact path={routes.transfer} component={TransferPage} />
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route path={routes.transactions} component={TransactionsPage} />
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

        <Route exact path={routes.myVault} component={MyVaultPage} />

        <Route
          path={routes.dashboardVaultDetails}
          component={({ match }) => (
            <DashboardVaultDetailsPage vaultId={match.params.vaultId} />
          )}
        />
        <Route exact path={routes.help} component={HelpPage} />
        <Route exact path={routes.support} component={SupportPage} />

        <Route exact path={routes.adminHome} component={AdminHomePage} />
        <Redirect to={routes.issue} />
      </Switch>
      <Disclaimer />
      <WatcherBalance />
      <WatcherDashboard />
      <WatcherBTCNode />
      <ActionModals />
      <GlobalStyle theme={...baseTheme as any} />
    </Providers>
  </ErrorBoundary>
);

export default hot(App);
