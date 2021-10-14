import { StoreConstructor } from './StoreConstructor';
import { get, observable } from 'mobx';

export class EntityStore<T> extends StoreConstructor {
  @observable
  public entityMap: Record<string, T> = {};

  @get
  public getEntity(entityId: string) {
    return this.entityMap[entityId];
  }
}
