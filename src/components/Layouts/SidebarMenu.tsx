import React from 'react';
import { useRouteMatch } from 'react-router';
import { useStores } from '../../stores';
import { ROUTE_NAMES, routes, router } from '../../constants/routePaths';
import { SideBarButton } from './SideBarButton';
import {
  BarChart,
  Iteration,
  PowerCycle,
  StatusUnknown,
  Support,
} from 'grommet-icons';
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
      <SideBarButton
        label="Help"
        active={router.isBelongsTo(ROUTE_NAMES.HELP, routeName)}
        onClick={navigateToRoute(routes.help)}
        icon={<StatusUnknown />}
      />
      <SideBarButton
        label="Support"
        active={router.isBelongsTo(ROUTE_NAMES.SUPPORT, routeName)}
        onClick={navigateToRoute(routes.support)}
        icon={<Support />}
      />
    </Box>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
