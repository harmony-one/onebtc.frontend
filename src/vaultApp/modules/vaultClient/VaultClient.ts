import { observable } from 'mobx';
import * as agent from 'superagent';
import { config } from '../../../config';

export interface VaultInfo {
  synchronized: boolean;
  syncProgress: string;
  registered: boolean;
  status: string;
  vaultAddress: string;
  vaultInfo: {
    btcPublicKeyX: string;
    btcPublicKeyY: string;
    collateral: string;
    issued: string;
    toBeIssued: string;
    toBeRedeemed: string;
    replaceCollateral: string;
    toBeReplaced: string;
  };
  contract: string;
  error?: string;
}

export interface OperationAction {
  id: string;
  type: 'transferBTC' | 'waitingConfirmations' | 'executeRedeem';
  status: 'success' | 'waiting' | 'error';
  transactionHash: string;
  error?: string;
  timestamp?: number;
  payload: {
    transactionHash: string;
  } | null;
}

export interface Operation {
  id: string;
  lastUpdate: number;
  actions: OperationAction[];
  type: 'REDEEM';
  vault: string;
  status: 'in_progress' | 'error' | 'success';
  amount: string;
  btcAddress: string;
  requester: string;
  timestamp: number;
  wasRestarted: null;
}

class VaultClient {
  public host: string;
  constructor({ host }: { host: string }) {
    this.host = host;
  }

  loadInfo(): Promise<VaultInfo> {
    return agent.get(`${this.host}/vault-client/info`).then(r => r.body);
  }

  async registration() {
    try {
      await agent
        .post(`${this.host}/vault-client/register`)
        .set('Content-Type', 'application/json')
        .send({ collateral: '10' });
    } catch (err) {
      console.error('### err', err);
      throw err;
    }
  }

  async loadOperations(params: {
    page: number;
    size: number;
  }): Promise<{ content: Operation[] }> {
    try {
      const response = await agent
        .get(`${this.host}/operations/data`)
        .query(params);
      return response.body;
    } catch (err) {
      console.error('### err', err);
      return { content: [] };
    }
  }

  async loadPayments(params: {
    page: number;
    size: number;
    vault: number;
  }): Promise<{ content: Operation[] }> {
    try {
      const response = await agent
        .get(`${this.host}/check-txs/${params.vault}/latest`)
        .query(params);
      return response.body;
    } catch (err) {
      console.error('### err', err);
      return { content: [] };
    }
  }

  async restartOperation(operationId: string): Promise<{ content: Operation[] }> {
    try {
      const response = await agent
        .post(`${this.host}/manage/actions/reset`)
        .set('Content-Type', 'application/json')
        .send({ operationId });

      return response.body;
    } catch (err) {
      console.error('### err', err);
      return { content: [] };
    }
  }

  @observable returnBtcAddress = ''; 

  async returnWrongPayment(tx: string, btcAddress: string): Promise<{ content: Operation[] }> {
    const response = await agent
      .post(`${this.host}/check-txs/return`)
      .set('Content-Type', 'application/json')
      .send({ tx, btcAddress });

    return response.body;
  }
}

export const vaultClient = new VaultClient({
  host: config.vaultApp.vaultHost,
});
