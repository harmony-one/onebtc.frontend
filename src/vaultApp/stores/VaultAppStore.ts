import { action, get, observable } from 'mobx';
import { vaultClient, VaultInfo } from '../modules/vaultClient/VaultClient';
import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { routes } from '../routes/routes';

export enum VaultClientStatus {
  INIT = 'init',
  WAITING_SYNC = 'waiting_sync',
  WAITING_LAUNCH = 'waiting_launch',
  WAITING_REGISTRATION = 'waiting_registration',
  READY = 'ready',
}

export class VaultAppStore extends StoreConstructor {
  @observable
  public vaultInfo: VaultInfo;

  @observable
  public status: VaultClientStatus = VaultClientStatus.INIT;

  init() {
    this.onInit();
  }

  @get
  get vaultId() {
    if (this.vaultInfo) {
      return this.vaultInfo.vaultAddress;
    }

    return '';
  }

  @action.bound
  async onInit() {
    const response = await vaultClient.loadInfo();
    this.vaultInfo = response;

    if (!response.synchronized) {
      this.status = VaultClientStatus.WAITING_SYNC;
      return;
    }

    if (response.status !== 'LAUNCHED') {
      this.status = VaultClientStatus.WAITING_LAUNCH;
      return;
    }

    if (!response.registered) {
      this.status = VaultClientStatus.WAITING_REGISTRATION;
      return;
    }

    this.status = VaultClientStatus.READY;
    return;
  }

  @action.bound
  async registerVault() {
    vaultClient.registration();
    this.stores.routing.goTo(routes.vaultDetails, {
      vaultId: this.vaultInfo.vaultAddress,
    });
  }

  @action.bound
  goToDetailsPage() {
    this.stores.routing.goTo(routes.vaultDetails, {
      vaultId: this.vaultInfo.vaultAddress,
    });
  }
}
