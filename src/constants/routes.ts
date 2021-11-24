import { InferValueTypes } from '../utils/types';

export enum ROUTE_NAMES {
  HOME = 'home',
  BRIDGE = 'bridge',
  BRIDGE_ISSUE = 'issue',
  BRIDGE_REDEEM = 'redeem',
  BRIDGE_TRANSFER = 'transfer',
  BRIDGE_BURN = 'burn',
  TRANSACTIONS = 'transactions',
  DASHBOARD = 'dashboard',
  DASHBOARD_RELAY = 'dashboardRelay',
  DASHBOARD_ISSUES = 'dashboardIssue',
  DASHBOARD_REDEEMS = 'dashboardRedeem',
  DASHBOARD_VAULT_LIST = 'dashboardVault',
  DASHBOARD_VAULT_DETAIL = 'dashboardVaultDetails',
}

export const routeTree: RouteNode[] = [
  {
    name: ROUTE_NAMES.HOME,
    path: '/',
    children: [
      {
        name: ROUTE_NAMES.BRIDGE,
        path: '/bridge',
        children: [
          {
            name: ROUTE_NAMES.BRIDGE_ISSUE,
            path: '/bridge/issue/:issueId?/:modal(deposit|details)?',
          },
          {
            name: ROUTE_NAMES.BRIDGE_REDEEM,
            path: '/bridge/redeem/:redeemId?/:modal(withdraw|details)?',
          },
          {
            name: ROUTE_NAMES.BRIDGE_TRANSFER,
            path: '/bridge/transfer',
          },
          {
            name: ROUTE_NAMES.BRIDGE_BURN,
            path: '/bridge/burn',
          },
        ],
      },
      {
        name: ROUTE_NAMES.TRANSACTIONS,
        path: '/transactions',
      },
      {
        name: ROUTE_NAMES.DASHBOARD,
        path: '/dashboard',
        children: [
          {
            name: ROUTE_NAMES.DASHBOARD_RELAY,
            path: '/dashboard/relay',
          },
          {
            name: ROUTE_NAMES.DASHBOARD_ISSUES,
            path: '/dashboard/issues/:issueId?',
          },
          {
            name: ROUTE_NAMES.DASHBOARD_REDEEMS,
            path: '/dashboard/redeem/:redeemId?',
          },
          {
            name: ROUTE_NAMES.DASHBOARD_VAULT_LIST,
            path: '/dashboard/vaults',
          },
          {
            name: ROUTE_NAMES.DASHBOARD_VAULT_DETAIL,
            path: '/dashboard/vaults/:vaultId',
          },
        ],
      },
    ],
  },
];

type RouteNode = {
  name: ROUTE_NAMES;
  path: string;
  children?: RouteNode[];
};

type RouteFlatMap = {
  [key in ROUTE_NAMES]: string;
};

const routeTreeToFlatMap = (
  node: RouteNode,
  flatMap: Partial<RouteFlatMap> = {},
): Partial<RouteFlatMap> => {
  const flat = { [node.name]: node.path };
  if (!node.children || node.children.length === 0) {
    return { ...flatMap, ...flat };
  }

  return node.children.reduce((acc, item) => {
    return { ...acc, ...flat, ...routeTreeToFlatMap(item, flatMap) };
  }, flatMap);
};

const routeFlatMap = routeTreeToFlatMap(routeTree[0]);

const findNode = (
  routeNodes: RouteNode[],
  name: ROUTE_NAMES,
): RouteNode | null => {
  return routeNodes.reduce((acc, routeNode) => {
    if (acc !== null) {
      return acc;
    }

    if (routeNode.name === name) {
      return routeNode;
    }

    if (routeNode.children) {
      return findNode(routeNode.children, name);
    }

    return null;
  }, null);
};

export const isBelongsTo = (
  parentName: ROUTE_NAMES,
  childName: ROUTE_NAMES,
): boolean => {
  const parentNode = findNode(routeTree, parentName);

  if (!parentNode) {
    throw Error('Parent node not found');
  }

  if (parentNode.name === childName) {
    return true;
  }

  if (!parentNode.children || parentNode.children.length === 0) {
    return false;
  }

  const childNode = findNode(parentNode.children, childName);

  return !!childNode;
};

export const routes = routeFlatMap as RouteFlatMap;

export const routeMap = Object.keys(routes).reduce((acc, key) => {
  const path = routes[key];
  acc[path] = key;

  return acc;
}, {});

export const getRouteName = (path: string): keyof typeof routes => {
  return routeMap[path];
};

export type Routes = InferValueTypes<typeof routes>;
