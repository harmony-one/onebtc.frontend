import React from 'react';
import { useRouteMatch } from 'react-router';
import { useStores } from '../../stores';
import {
  getRouteName,
  isBelongsTo,
  ROUTE_NAMES,
  routes,
} from '../../constants/routes';
import { SideBarButton } from './SideBarButton';
import { BarChart, Iteration, PowerCycle } from 'grommet-icons';
import { Box } from 'grommet';

interface Props {}

export const SidebarMenu: React.FC<Props> = () => {
  const route = useRouteMatch();

  const { routing } = useStores();

  const routeName = getRouteName(route.path);

  const navigateToRoute = (routePath: string) => () => {
    routing.goTo(routePath);
  };
  return (
    <Box gap="xsmall">
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
    </Box>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
