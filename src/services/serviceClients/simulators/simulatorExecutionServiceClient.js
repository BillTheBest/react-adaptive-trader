import Rx from 'rx'

export default class ExecutionServiceClient {
  constructor(blotterSimulator) {
    this._blotterSimulator = blotterSimulator
    this._tradeId = 0
  }

  executeRequest(tradeRequest) {
    var tradeDate = new Date()
    var twoDaysMillis = 2 * 24 * 60 * 60 * 1000
    var valueDate = new Date(tradeDate.getTime() + twoDaysMillis)

    var tradeDto = {
      tradeId: this._tradeId++,
      currencyPairSymbol: tradeRequest.symbol,
      dealtCurrency: tradeRequest.dealtCurrency,
      direction: tradeRequest.direction,
      notional: tradeRequest.notional,
      spotRate: tradeRequest.spotRate,
      status: 'done',
      tradeDate: tradeDate.toDateString(),
      traderName: 'Joe Trader',
      valueDate: valueDate.toDateString()
    }

    return Rx.Observable.timer(500, Rx.Scheduler.timeout)
             .select(() => tradeDto)
             .do(() => this._blotterSimulator.publishTrade(tradeDto))
  }
}
