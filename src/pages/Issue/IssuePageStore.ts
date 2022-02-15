import { StoreConstructor } from '../../stores/core/StoreConstructor';
import { action, computed, observable } from 'mobx';
import { getOneBTCClient } from 'services/oneBtcClient';
import { IssueDepositModal } from './components/IssueDepositModal/IssueDepositModal';
import { IssueDetailsModal } from './components/IssueDetailsModal/IssueDetailsModal';
import { IssueConfirmModal } from './components/IssueConfirmModal';
import { retry } from '../../utils';
import { UITransactionStatus } from '../../modules/uiTransaction/UITransactionsStore';
import { bitcoinToSatoshi, satoshiToBitcoin } from '../../services/bitcoin';
import { dashboardClient } from '../../modules/dashboard/dashboardClient';
import { IIssue, IVault } from '../../modules/dashboard/dashboardTypes';
import { IssueCanceledModal } from './components/IssueCanceledModal';
import BN from 'bn.js';

export interface ITransaction {
  amount: string;
  vaultId: string;
}

const BRIDGE_RATIO = 5;

export class IssuePageStore extends StoreConstructor {
  defaultForm: ITransaction = {
    amount: '0',
    vaultId: '',
  };

  @observable issuesMap: Record<string, IIssue> = {};

  @observable status: 'init' | 'pending' | 'success' | 'cancel' | 'error' =
    'init';

  @observable form = this.defaultForm;
  @observable public vaultList: IVault[] = [];

  @computed
  get bridgeFee() {
    return (Number(this.form.amount) * BRIDGE_RATIO) / 1000;
  }

  get bridgeRatio() {
    return (BRIDGE_RATIO / 1000) * 100;
  }

  @computed
  get totalReceive() {
    return Number(this.form.amount) - this.bridgeFee;
  }

  @action.bound
  updateSelectedVault() {
    const vaultList = this.getActiveVaultList(
      this.stores.vaultListStore.vaultList,
    );

    this.form.vaultId = this.stores.vaultListStore.getDefaultVaultId(vaultList);
  }

  isHarmonyVault = (vaultAddr: string) =>
    [
      '0x22b7349c260277337b7e773dd223cf04b25a6ee5',
      '0x15938cefe05ba88521630992d4d4027eba5dbedd',
    ].includes(vaultAddr.toLowerCase());

  getActiveVaultList(vaultList: IVault[]) {
    const amountSat = bitcoinToSatoshi(this.form.amount);

    const allVaults = vaultList.filter(vault => {
      return this.stores.vaultListStore.isEnoughFunds(vault, amountSat);
    });

    const externalVaults = allVaults.filter(v => !this.isHarmonyVault(v.id));

    return externalVaults.length ? externalVaults : allVaults;
  }

  @action.bound
  public async initPage() {
    await this.stores.vaultListStore.loadVaults();
    this.updateSelectedVault();
  }

  @action.bound
  public updateVaults() {
    this.stores.vaultListStore.loadVaults();
  }

  @action
  public setBiggestVault() {
    const vaultInfo = this.stores.vaultListStore.vaultList
      .map(vault => this.stores.vaultStore.getVaultInfo(vault))
      .reduce((acc, vaultInfo) => {
        if (!acc) {
          return vaultInfo;
        }

        return vaultInfo.availableToIssueSat.gt(acc.availableToIssueSat)
          ? vaultInfo
          : acc;
      }, null);

    this.form.vaultId = vaultInfo.id;
    this.form.amount = satoshiToBitcoin(
      vaultInfo.availableToIssueSat.toString(),
    ).toString();
  }

  @action
  async cancelIssue(issueId: string) {
    const issueUiTx = this.stores.uiTransactionsStore.create();
    issueUiTx.setStatusWaitingSignIn();
    issueUiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const issueInfo = this.stores.issueStore.getIssueInfo(issueId);

      await hmyClient.cancelIssue(issueInfo.requester, issueId, txHash => {
        issueUiTx.setTxHash(txHash);
        issueUiTx.setStatusProgress();
      });

      issueUiTx.hideModal();
      await this.loadIssueDetails(issueId);
      this.stores.actionModals.open(IssueCanceledModal, {
        initData: {},
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '320px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
    } catch (err) {
      console.log('### err execute cancelIssue error', err);
      this.status = 'error';
      issueUiTx.setStatusFail();
    }
  }

  @action.bound
  async executeIssue(issueId: string, btcTransactionHash: string) {
    this.status = 'pending';

    const issueUiTx = this.stores.uiTransactionsStore.create(undefined, {
      titles: {
        [UITransactionStatus.WAITING_SIGN_IN]:
          'Waiting for user to sign execute issue request',
        [UITransactionStatus.PROGRESS]:
          'Waiting for execute issue transaction to confirm',
        [UITransactionStatus.FAIL]: 'Error while execute issue transaction',
      },
    });
    issueUiTx.setStatusWaitingSignIn();
    issueUiTx.showModal();
    try {
      const issueInfo = this.stores.issueStore.getIssueInfo(issueId);

      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const result = await hmyClient.executeIssue(
        issueInfo.requester,
        issueInfo.issueId,
        btcTransactionHash,
        issueInfo.bitcoinAddress,
        txHash => {
          issueUiTx.setTxHash(txHash);
          issueUiTx.setStatusProgress();
        },
      );

      issueUiTx.setStatusSuccess();
      issueUiTx.hideModal();

      await this.loadIssueDetails(issueId);

      this.stores.actionModals.open(IssueConfirmModal, {
        initData: {
          total: issueInfo.amount,
          txHash: result.transactionHash,
        },
        applyText: '',
        closeText: '',
        noValidation: true,
        width: '700px',
        showOther: true,
        onApply: () => {
          return Promise.resolve();
        },
      });
      this.status = 'success';
      console.log('### execute redeem finished');
    } catch (err) {
      console.log('### err execute redeem error', err);
      this.status = 'error';
      issueUiTx.setStatusFail();
    }
  }

  @action.bound
  public async openIssueDetailsModal(issueId: string, onClose?: () => void) {
    await this.loadIssueDetails(issueId);

    this.stores.actionModals.open(IssueDetailsModal, {
      initData: {
        issueId,
      },
      applyText: '',
      closeText: 'Close',
      noValidation: true,
      width: '80%',
      showOther: false,
      onApply: () => {
        this.stores.routing.goToIssue();
        return Promise.resolve();
      },
      onClose: () => {
        if (onClose) {
          onClose();
        }
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async openDepositModal(issueId: string) {
    await this.loadIssueDetails(issueId);
    this.stores.actionModals.open(IssueDepositModal, {
      applyText: 'I have made the payment',
      closeText: 'Close',
      initData: {
        issueId,
      },
      noValidation: true,
      width: '500px',
      showOther: false,
      onApply: () => {
        this.stores.routing.goToIssueModal(issueId, 'details');
        return Promise.resolve();
      },
      onClose: () => {
        this.status = 'cancel';
        this.stores.routing.goToIssue();
        return Promise.resolve();
      },
    });
  }

  @action.bound
  public async loadIssueDetails(issueId: string) {
    try {
      const issue = await this.stores.issueStore.loadIssue(issueId);

      if (!issue) {
        return null;
      }

      return issue;
    } catch (err) {
      console.log('### err', err);
      return null;
    }
  }

  public async calcSecurityDeposit(issueAmountSat: number) {
    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);
      const collateralForIssued = await hmyClient.contract.methods
        .collateralForIssued(new BN(issueAmountSat))
        .call();

      return new BN(collateralForIssued)
        .mul(new BN(5))
        .div(new BN(1000))
        .toString();
    } catch (ex) {
      console.log('### ex', ex);
      return '0';
    }
  }

  @action.bound
  public async createIssue() {
    if (!this.stores.user.isAuthorized) {
      this.stores.user.openConnectWalletModal();
      return;
    }
    this.status = 'pending';

    const issueUiTx = this.stores.uiTransactionsStore.create(undefined, {
      titles: {
        [UITransactionStatus.WAITING_SIGN_IN]:
          'Waiting to user to sign issue request',
        [UITransactionStatus.PROGRESS]:
          'Waiting for confirmation of issue request',
        [UITransactionStatus.FAIL]: 'Error while issue request transaction',
      },
    });
    issueUiTx.showModal();

    try {
      const hmyClient = await getOneBTCClient(this.stores.user.sessionType);

      const vaultId = this.form.vaultId;

      const issueAmount = bitcoinToSatoshi(this.form.amount);

      issueUiTx.setStatusWaitingSignIn();

      const collateralForIssued = await hmyClient.contract.methods
        .collateralForIssued(new BN(issueAmount))
        .call();

      const oneAmount = new BN(collateralForIssued)
        .mul(new BN(5))
        .div(new BN(1000))
        .toString();

      let transactionHash = null;
      const issueRequest = await hmyClient.requestIssue(
        issueAmount,
        vaultId,
        oneAmount,
        txHash => {
          transactionHash = txHash;
          issueUiTx.setTxHash(txHash);
          issueUiTx.setStatusProgress();
        },
      );

      if (transactionHash) {
        await dashboardClient.addEvent(transactionHash);
      }

      issueUiTx.setStatusProgress();

      const issue = await retry(
        () => dashboardClient.loadIssue(issueRequest.issue_id),
        result => !!result,
        10,
      );

      issueUiTx.setIssueId(issue.id);

      issueUiTx.setStatusSuccess();
      issueUiTx.hideModal();

      this.stores.routing.goToIssueModal(issue.id, 'deposit');

      this.status = 'success';
    } catch (err) {
      issueUiTx.setStatusFail();
      issueUiTx.setError(err.message);
      // user: Error: MetaMask Tx Signature: User denied transaction signature.
      if (err.code === 4001) {
        issueUiTx.hideModal();
      }
      console.log('### Error during create issuePageStore', err);
      this.status = 'error';
    }
  }
}
