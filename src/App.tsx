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

const App: React.FC = () => (
  <Providers>
    <Switch>
      <Route exact path={routes.issue} component={IssuePage} />
      <Route exact path={routes.redeem} component={RedeemPage} />
      <Route exact path={routes.transfer} component={TransferPage} />
      <Route exact path={routes.sandbox} component={SandBoxPage} />
      <Redirect to={routes.issue} />
    </Switch>
    <ActionModals />
    <WatcherBalance />
    <GlobalStyle theme={...baseTheme as any} />
  </Providers>
);

export default hot(App);
