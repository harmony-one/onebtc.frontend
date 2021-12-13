import * as agent from 'superagent';
import { config } from '../../../config';

export interface VaultInfo {
  synchronized: boolean;
  syncProgress: string;
  registered: boolean;
  status: string;
  vaultAddress: string;
  vaultInfo: {
    collateral: string;
    issued: string;
    toBeIssued: string;
    toBeRedeemed: string;
    replaceCollateral: string;
    toBeReplaced: string;
  };
  contract: string;
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
}

export const vaultClient = new VaultClient({
  host: config.vaultApp.vaultHost,
});
