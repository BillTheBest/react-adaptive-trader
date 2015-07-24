import Rx from 'rx'
import NumberFormatter from 'helpers/numberFormatter.js'

export default class SimulatorPricingServiceClient {
  constructor(currencyPairRepository) {
    this._currencyPairRepository = currencyPairRepository
  }

  getPriceStream(currencyPair) {
    var ccyPairInfo = this._currencyPairRepository.getCurrencyPair(currencyPair)
    var initialPrice = { symbol: currencyPair, bid: 0, ask: 0, valueDate: 0, mid: ccyPairInfo.sampleRate}

    return Rx.Observable
      .return(0)
      .concat(
          Rx.Observable.timer(200, 200, Rx.Scheduler.timeout)
          .where(() => Math.random() > 0.8) // 1 chance out of 5 to tick, 1 tick per second in average
      )
      .scan(initialPrice, (previousValue) => this._generateNewQuote(previousValue, ccyPairInfo))
  }

  _generateNewQuote(previousPrice, ccyPairInfo) {
    var newMid = previousPrice.mid + (Math.random() - 0.5) / ccyPairInfo._pow

    // check that the new mid does not drift too far from sampleRate (10%)
    if (Math.abs(newMid - ccyPairInfo.sampleRate) / ccyPairInfo.sampleRate > 0.1) {
      newMid = ccyPairInfo.sampleRate
    }

    var price = {
      bid: NumberFormatter.round(newMid - ccyPairInfo._halfSpread / ccyPairInfo._pow, ccyPairInfo.currencyPair.ratePrecision),
      ask: NumberFormatter.round(newMid + ccyPairInfo._halfSpread / ccyPairInfo._pow, ccyPairInfo.currencyPair.ratePrecision),
      valueDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
      mid: newMid
    }

    return price
  }
}
