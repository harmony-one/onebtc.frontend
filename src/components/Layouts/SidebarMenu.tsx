import React from 'react';
import { useRouteMatch } from 'react-router';
import { useStores } from '../../stores';
import { ROUTE_NAMES, routes, router } from '../../constants/routePaths';
import { SideBarButton } from './SideBarButton';
import { BarChart, Iteration, PowerCycle } from 'grommet-icons';
import { Box } from 'grommet';

interface Props {}

export const SidebarMenu: React.FC<Props> = () => {
  const route = useRouteMatch();

  const { routing } = useStores();

  const routeName = router.findRouteNameByPath(route.path);

  const navigateToRoute = (routePath: string) => () => {
    routing.goTo(routePath);
  };
  return (
    <Box gap="xsmall">
      <SideBarButton
        label="Bridge"
        active={router.isBelongsTo(ROUTE_NAMES.BRIDGE, routeName)}
        onClick={navigateToRoute(routes.issue)}
        icon={<PowerCycle />}
      />
      <SideBarButton
        label="My transactions"
        active={router.isBelongsTo(ROUTE_NAMES.TRANSACTIONS, routeName)}
        onClick={navigateToRoute(routes.transactions)}
        icon={<Iteration />}
      />
      <SideBarButton
        label="Dashboard"
        active={router.isBelongsTo(ROUTE_NAMES.DASHBOARD, routeName)}
        onClick={navigateToRoute(routes.dashboard)}
        icon={<BarChart />}
      />
    </Box>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
