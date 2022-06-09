import { action, observable } from 'mobx';
import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { getOneBTCClient } from '../../services/oneBtcClient';
import { IncreaseCollateralConfirmModal } from './components/IncreaseCollateralConfirmModal';
import { VaultManageModal } from './components/VaultManageModal';
import utils from 'web3-utils';
import logger from '../../modules/logger';
import { VaultStakeModal } from './components/VaultStakeModal';
import { VaultRewardsModal } from './components/VaultRewardsModal';
import { StakeConfirmModal } from './components/StakeConfirmModal';
import { RewardConfirmModal } from './components/RewardConfirmModal';

const log = logger.module('Vault');

export class DashboardVaultDetailsStore extends StoreConstructor {
  @observable
  public formWithdraw = {
    oneAmount: '0',
  };

  @observable
  public formIncrease = {
    oneAmount: '0',
  };

  public status = 'init';

  @action.bound
  public async openManageModal(vaultId: string) {
    this.stores.actionModals.open(VaultManageModal, {
      initData: {
        vaultId: vaultId,
      },
      applyText: '',
      closeText: '',
      noValidation: true,
      width: '420px',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async openStakeModal(vaultId: string) {
    this.stores.actionModals.open(VaultStakeModal, {
      initData: {
        vaultId: vaultId,
      },
      applyText: '',
      closeText: '',
      noValidation: true,
      width: '520px',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async openRewardsModal(vaultId: string) {
    this.stores.actionModals.open(VaultRewardsModal, {
      initData: {
        vaultId: vaultId,
      },
      applyText: '',
      closeText: '',
      noValidation: true,
      width: '520px',
      showOther: true,
      onApply: () => {
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async increaseCollateral() {
    const uiTx = this.stores.uiTransactionsStore.create();
    uiTx.setStatusProgress();
    uiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      uiTx.setStatusWaitingSignIn();

      const amount = utils.toWei(this.formIncrease.oneAmount);

      const result = await hmyClient.lockAdditionalCollateral(
        amount,
        txHash => {
          uiTx.setTxHash(txHash);
          uiTx.setStatusProgress();
        },
      );

      this.stores.actionModals.open(IncreaseCollateralConfirmModal, {
        initData: {
          total: utils.fromWei(amount),
          txHash: result.transactionHash,
        },
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';

      uiTx.hideModal();
      uiTx.setStatusSuccess();
    } catch (error) {
      log.error('Error Increase Collateral', { error });
      this.status = 'error';
      uiTx.setError(error);
      uiTx.setStatusFail();
    }
  }

  @action.bound
  public async withdrawCollateral() {
    const uiTx = this.stores.uiTransactionsStore.create();
    uiTx.setStatusProgress();
    uiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      uiTx.setStatusWaitingSignIn();

      const amount = utils.toWei(this.formWithdraw.oneAmount);

      // @ts-expect-error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
      const result = await hmyClient.withdrawCollateral(amount, txHash => {
        uiTx.setTxHash(txHash);
        uiTx.setStatusProgress();
      });

      this.stores.actionModals.open(IncreaseCollateralConfirmModal, {
        initData: {
          total: utils.fromWei(amount),
          txHash: result.transactionHash,
        },
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';
      uiTx.hideModal();
      uiTx.setStatusSuccess();
    } catch (error) {
      log.error('Error Withdraw Collateral', { error });
      this.status = 'error';
      uiTx.setError(error);
      uiTx.setStatusFail();
    }
  }

  @action.bound
  public async extendVaultLockPeriod(vaultId: string, period: number) {
    const uiTx = this.stores.uiTransactionsStore.create();
    uiTx.setStatusProgress();
    uiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      uiTx.setStatusWaitingSignIn();

      await hmyClient.extendVaultLockPeriod(vaultId, period, txHash => {
        uiTx.setTxHash(txHash);
        uiTx.setStatusProgress();
      });

      await this.stores.vaultStakeStore.loadVault(vaultId);

      this.stores.actionModals.open(StakeConfirmModal, {
        initData: {
          // total: utils.fromWei(amount),
          // txHash: result.transactionHash,
        },
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';
      uiTx.hideModal();
      uiTx.setStatusSuccess();
    } catch (error) {
      log.error('Error Withdraw Collateral', { error });
      this.status = 'error';
      uiTx.setError(error);
      uiTx.setStatusFail();
    }
  }

  @action.bound
  public async claimRewards(vaultId: string, type: 'claim' | 'stake') {
    const uiTx = this.stores.uiTransactionsStore.create();
    uiTx.setStatusProgress();
    uiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      uiTx.setStatusWaitingSignIn();

      if (type === 'claim') {
        await hmyClient.claimRewards(vaultId, txHash => {
          uiTx.setTxHash(txHash);
          uiTx.setStatusProgress();
        });
      } else {
        await hmyClient.claimRewardsAndLock(vaultId, txHash => {
          uiTx.setTxHash(txHash);
          uiTx.setStatusProgress();
        });
      }

      await this.stores.vaultStakeStore.loadVault(vaultId);

      this.stores.actionModals.open(RewardConfirmModal, {
        initData: {
          // total: utils.fromWei(amount),
          // txHash: result.transactionHash,
        },
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';
      uiTx.hideModal();
      uiTx.setStatusSuccess();
    } catch (error) {
      log.error('Error Withdraw Collateral', { error });
      this.status = 'error';
      uiTx.setError(error);
      uiTx.setStatusFail();
    }
  }

  @action.bound
  public async updateVaultAccClaimableRewards(vaultId: string) {
    const uiTx = this.stores.uiTransactionsStore.create();
    try {
      uiTx.setStatusProgress();
      uiTx.showModal();

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      uiTx.setStatusWaitingSignIn();

      await hmyClient.updateVaultAccClaimableRewards(vaultId, txHash => {
        uiTx.setTxHash(txHash);
        uiTx.setStatusProgress();
      });

      uiTx.setStatusSuccess();
      uiTx.hideModal();

      await this.stores.vaultStakeStore.loadVault(vaultId);
    } catch (error) {
      console.log('### error', error);
      log.error('Error update claim rewards', { error });
      this.status = 'error';
      uiTx.setError(error);
      uiTx.setStatusFail();
    }
  }
}
