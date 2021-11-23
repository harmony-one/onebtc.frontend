import React from 'react';
import { Box, Image, Nav, Sidebar as GSidebar } from 'grommet';
import { BarChart, Iteration, PowerCycle } from 'grommet-icons';
import { Title } from '../Base';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router';
import {
  getRouteName,
  isBelongsTo,
  ROUTE_NAMES,
  routes,
} from '../../constants/routes';
import { useStores } from '../../stores';
import { SideBarButton } from './SideBarButton';

interface Props {}

const SidebarHead = (
  <Box direction="row" gap="xsmall" align="center">
    <Image height="32" src="/one.svg" />
    <Title size="small" color="BlackTxt" bold>
      1BTC By Harmony
    </Title>
  </Box>
);

export const Sidebar: React.FC<Props> = observer(() => {
  const route = useRouteMatch();

  const { routing } = useStores();

  const routeName = getRouteName(route.path);

  const navigateToRoute = (routePath: string) => () => {
    routing.goTo(routePath);
  };

  console.log('### rerender');

  return (
    <GSidebar header={SidebarHead}>
      <Nav align="start" gap="xsmall">
        <SideBarButton
          label="Bridge"
          active={isBelongsTo(ROUTE_NAMES.BRIDGE, routeName)}
          onClick={navigateToRoute(routes.issue)}
          icon={<PowerCycle />}
        />
        <SideBarButton
          label="My transactions"
          active={isBelongsTo(ROUTE_NAMES.TRANSACTIONS, routeName)}
          onClick={navigateToRoute(routes.transactions)}
          icon={<Iteration />}
        />
        <SideBarButton
          label="Dashboard"
          active={isBelongsTo(ROUTE_NAMES.DASHBOARD, routeName)}
          onClick={navigateToRoute(routes.dashboard)}
          icon={<BarChart />}
        />
      </Nav>
    </GSidebar>
  );
});

Sidebar.displayName = 'Sidebar';
