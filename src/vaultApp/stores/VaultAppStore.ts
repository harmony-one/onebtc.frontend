import { action, get, observable } from 'mobx';
import { vaultClient, VaultInfo } from '../modules/vaultClient/VaultClient';
import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { routes } from '../routes/routes';
import logger from '../../modules/logger';

const log = logger.module('VaultAppStore');

export class VaultAppStore extends StoreConstructor {
  @observable
  public vaultInfo: VaultInfo;

  @get
  get vaultId() {
    if (this.vaultInfo) {
      return this.vaultInfo.vaultAddress;
    }

    return '';
  }

  @action.bound
  async loadVaultInfo() {
    this.vaultInfo = await vaultClient.loadInfo();
    return this.vaultInfo;
  }

  @action.bound
  async bootstrap() {
    log.info('run bootstrap');
    try {
      const vaultInfo = await this.loadVaultInfo();

      if (!vaultInfo.registered) {
        this.stores.routing.goTo(routes.registration);
        return;
      }

      this.stores.routing.goTo(routes.vaultDetails, {
        vaultId: vaultInfo.vaultAddress,
      });
      return;
    } catch (err) {
      log.error('Error during load vault info');
      this.stores.routing.goTo(routes.initError);
    }
  }

  @action.bound
  async registerVault() {
    try {
      await vaultClient.registration();
      await this.bootstrap();
      this.goToDetailsPage();
    } catch (err) {
      console.error('### err', err);
      throw err;
    }
  }

  @get
  get syncProgress() {
    return (this.vaultInfo && this.vaultInfo.syncProgress) || '0';
  }

  @action.bound
  goToDetailsPage() {
    this.stores.routing.goTo(routes.vaultDetails, {
      vaultId: this.vaultInfo.vaultAddress,
    });
  }
}
