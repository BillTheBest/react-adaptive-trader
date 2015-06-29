import AmpersandState from 'ampersand-state'
import extraProperties from 'services/extraProperties.js'

export default AmpersandState.extend({
  extraProperties: extraProperties(),
  props: {
    bid: { type: 'number', required: true },
    ask: { type: 'number', required: true },
    mid: { type: 'number', required: true},
    valueDate: { type: 'date', required: true },
    currencyPair: { type: 'object', required: true }
  },

  derived: {
    spread: {
      deps: ['bid', 'ask', 'currencyPair'],
      fn: () => (this.ask.rate - this.bid.rate) * Math.pow(10, this.currencyPair.pipsPosition)
    }
  }
})
