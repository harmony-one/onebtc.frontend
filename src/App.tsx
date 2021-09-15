import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { baseTheme } from 'themes';
import { GlobalStyle } from './GlobalStyle';
import { Providers } from './Providers';
import { Redirect, Route, Switch } from 'react-router';
import { ActionModals } from './components/ActionModals';
import { IssuePage } from './pages/Issue/IssuePage';
import { SandBoxPage } from './pages/Sandbox/SandBoxPage';
import { InfoModal } from './components/InfoModal';
import { RedeemPage } from './pages/Redeem/RedeemPage';
import { TransferPage } from './pages/Transfer/TransferPage';

const App: React.FC = () => (
  <Providers>
    <Switch>
      <Route exact path="/bridge/issue" component={IssuePage} />
      <Route exact path="/bridge/redeem" component={RedeemPage} />
      <Route exact path="/bridge/transfer" component={TransferPage} />
      <Route exact path="/sandbox" component={SandBoxPage} />
      <Redirect to="/bridge/issue" />
    </Switch>
    <ActionModals />
    <InfoModal />
    <GlobalStyle theme={...baseTheme as any} />
  </Providers>
);

export default hot(App);
