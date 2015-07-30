import Rx from 'rx';
import Stale from 'model/stale.js';
import Price from 'model/pricing/price.js';
import _ from 'lodash';

export default class PriceService {
  constructor(pricingServiceClient) {
    this._pricingServiceClient = pricingServiceClient;
  }

  getPriceStream(currencyPair) {
    return Rx.Observable.defer(()=> this._pricingServiceClient.getPriceStream(currencyPair.symbol))
      .select(p => {
        let dto = _.extend(p, { currencyPair: currencyPair });
        let price = new Price(dto);
        return price;
      })
      .catch(ex => {
        console.error('Error thrown in stream ' + currencyPair.symbol, ex);
        // if the stream errors (server disconnected), we push a stale price
        return Rx.Observable
          .return(new Stale(true))
          // terminate the observable in 3sec so the repeat does not kick-off immediatly
          .concat(Rx.Observable.timer(3000, Rx.Scheduler.timeout).ignoreElements().select(() => new Stale(true)));
      })
      .repeat()
      .detectStale(4000, Rx.Scheduler.timeout)
      .publish()
      .refCount();
  }
}
