import React from 'react';
import { useRouteMatch } from 'react-router';
import { Iteration, Cube } from 'grommet-icons';
import { Box } from 'grommet';
import { useStores } from '../../../stores';
import { SideBarButton } from '../../../components/Layouts/SideBarButton';
import { ROUTE_NAMES, router, routes } from '../../routes/routes';

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
        label="Details"
        active={router.isBelongsTo(ROUTE_NAMES.VAULT_DETAILS, routeName)}
        onClick={navigateToRoute(routes.vaultDetails)}
        icon={<Cube />}
      />
      <SideBarButton
        label="Operations"
        active={router.isBelongsTo(ROUTE_NAMES.OPERATION_LIST, routeName)}
        onClick={navigateToRoute(routes.operationList)}
        icon={<Iteration />}
      />
    </Box>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
