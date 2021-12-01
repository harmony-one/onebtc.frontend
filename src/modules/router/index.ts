import { ROUTE_NAMES } from '../../constants/routePaths';

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export type RouteNode<T> = {
  name: T;
  path: string;
  children?: RouteNode<T>[];
};

export class Router<T extends string> {
  private _routeTree: RouteNode<T>;
  private _routeFlat: Record<T, string>;
  private _routeFlatMirror: Record<string, T>;

  constructor(routeTree: RouteNode<T>) {
    this._routeTree = routeTree;
    this._routeFlat = this._routeTreeToFlatMap(routeTree);
    this._routeFlatMirror = this._makeMirrorForFlatMap(this._routeFlat);
  }

  public getFlatMap(): Record<T, string> {
    return this._routeFlat;
  }

  private _makeMirrorForFlatMap(routes: Record<T, string>) {
    return getKeys(routes).reduce((acc, key) => {
      const path = routes[key];
      acc[path] = key;

      return acc;
    }, {} as Record<string, T>);
  }

  private _routeTreeToFlatMap(
    node: RouteNode<T>,
    flatMap?: Record<T, string>,
  ): Record<T, string> {
    const _flatMap = { [node.name]: node.path };

    if (!node.children || node.children.length === 0) {
      return { ...flatMap, ..._flatMap };
    }

    return node.children.reduce((acc, item) => {
      return {
        ...acc,
        ..._flatMap,
        ...this._routeTreeToFlatMap(item, flatMap),
      };
    }, flatMap);
  }

  private findNode(
    routeNode: RouteNode<T>,
    name: ROUTE_NAMES,
  ): RouteNode<T> | null {
    if (routeNode.name === name) {
      return routeNode;
    }

    if (!routeNode.children || routeNode.children.length === 0) {
      return null;
    }

    return routeNode.children.reduce((acc, routeNode) => {
      if (acc) {
        return acc;
      }

      const node = this.findNode(routeNode, name);

      if (node) {
        return node;
      }

      return null;
    }, null);
  }

  public isBelongsTo(parentName: ROUTE_NAMES, childName: ROUTE_NAMES): boolean {
    const parentNode = this.findNode(this._routeTree, parentName);

    if (!parentNode) {
      throw Error('Parent node not found');
    }

    if (parentNode.name === childName) {
      return true;
    }

    if (!parentNode.children || parentNode.children.length === 0) {
      return false;
    }

    const childNode = this.findNode(parentNode, childName);

    return !!childNode;
  }

  public findRouteNameByPath(path: string) {
    return this._routeFlatMirror[path];
  }
}
