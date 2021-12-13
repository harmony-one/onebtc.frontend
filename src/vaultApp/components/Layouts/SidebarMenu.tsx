import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { Iteration } from 'grommet-icons';
import { Box } from 'grommet';
import { useStores } from '../../../stores';
import { SideBarButton } from '../../../components/Layouts/SideBarButton';
import { ROUTE_NAMES, router, routes } from '../../routes/routes';

interface Props {}

export const SidebarMenu: React.FC<Props> = () => {
  const route = useRouteMatch();

  const { vaultAppStore } = useStores().vaultApp;

  useEffect(() => {
    vaultAppStore.onInit();
  }, [vaultAppStore]);

  const { routing } = useStores();

  const routeName = router.findRouteNameByPath(route.path);

  const navigateToRoute = (routePath: string) => () => {
    routing.goTo(routePath);
  };

  return (
    <Box gap="xsmall">
      {/*<SideBarButton*/}
      {/*  label="Status"*/}
      {/*  active={router.isBelongsTo(ROUTE_NAMES.INIT, routeName)}*/}
      {/*  onClick={navigateToRoute(routes.init)}*/}
      {/*  icon={<PowerCycle />}*/}
      {/*/>*/}
      <SideBarButton
        label="Details"
        active={router.isBelongsTo(ROUTE_NAMES.VAULT_DETAILS, routeName)}
        onClick={navigateToRoute(routes.vaultDetails)}
        icon={<Iteration />}
      />
    </Box>
  );
};

SidebarMenu.displayName = 'SidebarMenu';
