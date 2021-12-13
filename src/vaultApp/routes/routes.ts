import { RouteNode, Router } from '../../modules/router';

export enum ROUTE_NAMES {
  HOME = 'home',
  VAULT_DETAILS = 'vaultDetails',
  INIT = 'init',
  REGISTRATION = 'registration',
  INIT_ERROR = 'initError',
}

const routeTree: RouteNode<ROUTE_NAMES> = {
  name: ROUTE_NAMES.HOME,
  path: '/',
  children: [
    {
      name: ROUTE_NAMES.REGISTRATION,
      path: '/registration',
    },
    {
      name: ROUTE_NAMES.INIT,
      path: '/init',
    },
    {
      name: ROUTE_NAMES.INIT_ERROR,
      path: '/initError',
    },
    {
      name: ROUTE_NAMES.VAULT_DETAILS,
      path: '/details',
    },
  ],
};

export const router = new Router(routeTree);
export const routes = router.getFlatMap();
