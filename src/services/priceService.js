import Rx from 'rx'
import StalePrice from 'model/pricing/stalePrice.js'
import Price from 'model/pricing/price.js'

export default class PriceService {
  constructor(pricingServiceClient) {
    this._pricingServiceClient = pricingServiceClient
  }

  getPriceStream(currencyPair) {
    return Rx.Observable.defer(()=> this._pricingServiceClient.getPriceStream(currencyPair.symbol))
      .catch(ex => {
        console.error('Error thrown in stream ' + currencyPair.symbol, ex)
        // if the stream errors (server disconnected), we push a stale price
        return Rx.Observable
          .return(new StalePrice(currencyPair))
          // terminate the observable in 3sec so the repeat does not kick-off immediatly
          .concat(Rx.Observable.timer(3000, Rx.Scheduler.timeout).ignoreElements().select(() => new StalePrice(currencyPair)))
      })
      .repeat()
      .detectStale(4000, Rx.Scheduler.timeout)
      .select(s => {
        return s.isStale ? new StalePrice(currencyPair) : new Price(s.update)
      })
      .publish()
      .refCount()
  }
}
