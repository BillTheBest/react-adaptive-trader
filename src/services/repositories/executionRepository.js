import Rx from 'rx'
import Trade from 'model/execution/trade.js'

export class ExecutionRepository {
  constructor(executionServiceClient) {
      this._executionServiceClient = executionServiceClient
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

    return this._executionServiceClient.executeTrade(request)
        .select(response => new Trade(response.trade))
        .detectStale(2000, Rx.Scheduler.timeout)
  }
}
