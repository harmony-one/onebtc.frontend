import { StoreConstructor } from './core/StoreConstructor';
import { action, observable } from 'mobx';
import * as agent from 'superagent';

export class RatesStore extends StoreConstructor {
  @observable public ONE_USDT = 0;
  @observable public BTC_USDT = 0;
  @observable public ONE_BTC = 0;
  @observable loading = false;

  @action loadRate(symbol: string): Promise<number> {
    return agent
      .get(`https://api.binance.com/api/v1/ticker/24hr?symbol=${symbol}`)
      .then(response => Number(response.body.lastPrice));
  }

  @action public async loadRates() {
    const [BTC_USDT, ONE_USDT, ONE_BTC] = await Promise.all([
      this.loadRate('BTCUSDT'),
      this.loadRate('ONEUSDT'),
      this.loadRate('ONEBTC'),
    ]);

    this.BTC_USDT = BTC_USDT;
    this.ONE_USDT = ONE_USDT;
    this.ONE_BTC = ONE_BTC;
  }
}
