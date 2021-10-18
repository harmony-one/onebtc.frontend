import { action, observable } from 'mobx';
import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { getOneBTCClient } from '../../services/oneBtcClient';
import { IncreaseCollateralConfirmModal } from './components/IncreaseCollateralConfirmModal';
import { VaultManageModal } from './components/VaultManageModal';

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
  public async increaseCollateral() {
    const uiTx = this.stores.uiTransactionsStore.create();
    uiTx.setStatusProgress();
    uiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);
      hmyClient.setUseMathWallet(true);

      uiTx.setStatusWaitingSignIn();

      const amount = Number(this.formIncrease.oneAmount) * 1e18;

      const result = await hmyClient.methods.lockAdditionalCollateral(
        amount,
        txHash => {
          uiTx.setTxHash(txHash);
          uiTx.setStatusProgress();
        },
      );

      this.stores.actionModals.open(IncreaseCollateralConfirmModal, {
        initData: {
          total: this.formWithdraw.oneAmount,
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
      console.log('### err', error);
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
      hmyClient.setUseMathWallet(true);

      uiTx.setStatusWaitingSignIn();

      const amount = Number(this.formWithdraw.oneAmount) * 1e18;

      const result = await hmyClient.methods.withdrawCollateral(
        amount,
        txHash => {
          uiTx.setTxHash(txHash);
          uiTx.setStatusProgress();
        },
      );

      this.stores.actionModals.open(IncreaseCollateralConfirmModal, {
        initData: {
          total: this.formIncrease.oneAmount,
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
      console.log('### err', error);
      this.status = 'error';
      uiTx.setError(error);
      uiTx.setStatusFail();
    }
  }
}
