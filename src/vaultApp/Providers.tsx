import * as React from 'react';
import { Grommet } from 'grommet';
import { Router } from 'react-router';
import { Provider as MobxProvider } from 'mobx-react';
import stores, { StoresProvider } from '../stores';
import { baseTheme } from '../themes';

export const Providers: React.FC = ({ children }) => (
  <StoresProvider stores={stores as any}>
    <MobxProvider {...stores}>
      <Grommet theme={baseTheme} plain={true} full="min" id="grommetRoot">
        <Router history={stores.routing.history}>{children}</Router>
      </Grommet>
    </MobxProvider>
  </StoresProvider>
);
