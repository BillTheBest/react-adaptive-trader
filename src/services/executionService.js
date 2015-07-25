import Rx from 'rx'
import Trade from 'model/execution/trade.js'
import Stale from 'model/stale.js'

export default class ExecutionService {
  constructor(executionServiceClient, limitCheckerService) {
      this._executionServiceClient = executionServiceClient
      this._limitCheckerService = limitCheckerService
  }

  executeRequest(ccyPairSymbol, ccyIsoCode, direction, spotRate, valueDate, notional) {
    var request = {
      direction: direction,
      notional: notional,
      spotRate: spotRate,
      currencyPair: ccyPairSymbol,
      dealtCurrency: ccyIsoCode,
      valueDate: valueDate.toISOString()
    }

    return this._limitCheckerService
      .checkLimit(request)
      .flatMap(limitCheckResult => {
        if (limitCheckResult) {
          return this._executionServiceClient
            .executeRequest(request)
            .select(response => {
              console.log('executed', response.trade)
              return new Trade(response.trade)
            })
            .detectStale(2000, Rx.Scheduler.timeout)
        } else {
          var trade = new Trade({
            currencyPair: ccyPairSymbol,
            dealtCurrency: ccyIsoCode,
            tradeStatus: 'notionalOvershot',
            direction: direction,
            notional: notional,
            spotRate: spotRate
          })

          return Rx.Observable.returnValue(new Stale(false, trade))
        }
      })
  }
}
