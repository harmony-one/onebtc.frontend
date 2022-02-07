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
import { WatcherBTCNode } from '../modules/btcNode/WatcherBTCNode';
import { ActionModals } from '../components/ActionModals';
import { RegistrationPage } from './pages/registration/RegistrationPage';
import { InitErrorPage } from './pages/initError/InitErrorPage';
import { WatcherVaultInfo } from './components/WatcherVaultInfo';
import { OperationListPage } from './pages/operations/OperationListPage';
import { Bootstrap } from './Bootstrap';

const VaultApp: React.FC = () => (
  <ErrorBoundary>
    <Providers>
      <Bootstrap />
      <Switch>
        <Route exact path={routes.init} component={InitializationPage} />
        <Route exact path={routes.vaultDetails} component={VaultDetailsPage} />
        <Route
          exact
          path={routes.operationList}
          component={OperationListPage}
        />
        <Route exact path={routes.registration} component={RegistrationPage} />
        <Route exact path={routes.initError} component={InitErrorPage} />
        <Redirect to={routes.init} />
      </Switch>
      <WatcherBalance />
      <WatcherBTCNode />
      <WatcherVaultInfo />
      <ActionModals />
      <GlobalStyle theme={...baseTheme as any} />
    </Providers>
  </ErrorBoundary>
);

export default hot(VaultApp);
