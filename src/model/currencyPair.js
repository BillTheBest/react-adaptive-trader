import Rx from 'rx'
import AmpersandState from 'ampersand-state'
import isProduction from 'services/isProduction.js'
//import priceService from 'services/priceService.js'

let extraProperties = 'reject'
if (isProduction()) {
  extraProperties = 'ignore'
}

export default AmpersandState.extend({
  extraProperties: extraProperties,
  props: {
    symbol: { type: 'string', required: true },
    ratePrecision: { type: 'number', required: true },
    pipsPosition: { type: 'number', required: true }
  },

  derived: {
    baseCurrency: {
      deps: ['symbol'],
      fn: () => this.symbol.substring(0, 3)
    },

    counterCurrency: {
      deps: ['symbol'],
      fn: () => this.symbol.substring(3, 6)
    }//,

    // prices: () => {
    //   return Rx.Observable.defer(()=> priceService.getPriceStream(this))
    //           .publish()
    //           .refCount()
    // }
  }
})
