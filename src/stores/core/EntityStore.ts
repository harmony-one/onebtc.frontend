import { StoreConstructor } from './StoreConstructor';
import { observable } from 'mobx';

export class EntityStore<T> extends StoreConstructor {
  @observable
  public entityMap: Record<string, T> = {};

  public getEntity(entityId: string): T {
    return this.entityMap[entityId];
  }
}
