import { StoreConstructor } from './StoreConstructor';
import { observable } from 'mobx';

export class EntityStore<T> extends StoreConstructor {
  @observable
  public entityMap: Record<string, T> = {};

  public getEntity(entityId: string) {
    return this.entityMap[entityId];
  }
}
