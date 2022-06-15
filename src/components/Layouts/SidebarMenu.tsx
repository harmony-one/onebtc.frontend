import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { useStores } from '../../stores';
import { ROUTE_NAMES, router, routes } from '../../constants/routePaths';
import { SideBarButton } from './SideBarButton';
import {
  BarChart,
  Cube,
  Iteration,
  PowerCycle,
  StatusUnknown,
  Support,
} from 'grommet-icons';
import { Box } from 'grommet';
import { observer } from 'mobx-react';
import { ThemeContext } from '../../themes/ThemeContext';
import { ThemeProvider } from '../../themes/ThemeProvider';

interface Props {}

export const SidebarMenu: React.FC<Props> = observer(() => {
  const route = useRouteMatch();

  const { routing, user } = useStores();

  const routeName = router.findRouteNameByPath(route.path);

  const navigateToRoute = (routePath: string) => () => {
    routing.goTo(routePath);
  };

  const themeContext = useContext(ThemeContext);

  const hasVault = !!user.vault;
  const iconColor = themeContext.theme.sidebarMenu.icon.color;

  return (
    <Box gap="xsmall">
      <SideBarButton
        label="Bridge"
        active={router.isBelongsTo(ROUTE_NAMES.BRIDGE, routeName)}
        onClick={navigateToRoute(routes.issue)}
        icon={<PowerCycle color={iconColor} />}
      />
      <SideBarButton
        label="My transactions"
        active={router.isBelongsTo(ROUTE_NAMES.TRANSACTIONS, routeName)}
        onClick={navigateToRoute(routes.transactions)}
        icon={<Iteration color={iconColor} />}
      />
      {hasVault && (
        <SideBarButton
          label="My vault"
          active={router.isBelongsTo(ROUTE_NAMES.MY_VAULT, routeName)}
          onClick={navigateToRoute(routes.myVault)}
          icon={<Cube color={iconColor} />}
        />
      )}
      <SideBarButton
        label="Dashboard"
        active={router.isBelongsTo(ROUTE_NAMES.DASHBOARD, routeName)}
        onClick={navigateToRoute(routes.dashboard)}
        icon={<BarChart color={iconColor} />}
      />
      <SideBarButton
        label="Help"
        active={router.isBelongsTo(ROUTE_NAMES.HELP, routeName)}
        onClick={navigateToRoute(routes.help)}
        icon={<StatusUnknown color={iconColor} />}
      />
      <SideBarButton
        label="Support"
        active={router.isBelongsTo(ROUTE_NAMES.SUPPORT, routeName)}
        onClick={navigateToRoute(routes.support)}
        icon={<Support color={iconColor} />}
      />
    </Box>
  );
});

SidebarMenu.displayName = 'SidebarMenu';
