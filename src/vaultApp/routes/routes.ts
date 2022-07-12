import { RouteNode, Router } from '../../modules/router';

export enum ROUTE_NAMES {
  HOME = 'home',
  VAULT_DETAILS = 'vaultDetails',
  INIT = 'init',
  REGISTRATION = 'registration',
  INIT_ERROR = 'initError',
  OPERATION_LIST = 'operationList',
  ADMIN_HOME = 'adminHome',
  PAYMENTS = 'payments',
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
    {
      name: ROUTE_NAMES.OPERATION_LIST,
      path: '/operations',
    },
    {
      name: ROUTE_NAMES.PAYMENTS,
      path: '/payments',
    },
    {
      name: ROUTE_NAMES.ADMIN_HOME,
      path: '/admin',
    },
  ],
};

export const router = new Router(routeTree);
export const routes = router.getFlatMap();
