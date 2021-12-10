import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { baseTheme } from '../themes';
import { Redirect, Route, Switch } from 'react-router';
import { GlobalStyle } from '../GlobalStyle';
import { Providers } from './Providers';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { routes } from './routes/routes';
import { InitializationPage } from './pages/initialization/InitializationPage';
import { VaultDetailsPage } from './pages/vaultDetails/VaultDetailsPage';
import { WatcherBalance } from '../components/WatcherBalance';
import { WatcherDashboard } from '../modules/dashboard/WatcherDashboard';
import { WatcherBTCNode } from '../modules/btcNode/WatcherBTCNode';
import { ActionModals } from '../components/ActionModals';

const VaultApp: React.FC = () => (
  <ErrorBoundary>
    <Providers>
      <Switch>
        <Route
          exact
          path={routes.initialization}
          component={InitializationPage}
        />
        <Route exact path={routes.vaultDetails} component={VaultDetailsPage} />
        <Redirect to={routes.initialization} />
      </Switch>
      <WatcherBalance />
      <WatcherDashboard />
      <WatcherBTCNode />
      <ActionModals />
      <GlobalStyle theme={...baseTheme as any} />
    </Providers>
  </ErrorBoundary>
);

export default hot(VaultApp);
