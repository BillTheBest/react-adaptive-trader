import AmpersandState from 'ampersand-state'
import extraProperties from 'services/extraProperties.js'
import PriceFormatter from 'helpers/priceFormatter.js'

export default AmpersandState.extend({
  extraProperties: extraProperties(),
  props: {
    bid: { type: 'number', required: true },
    ask: { type: 'number', required: true },
    mid: { type: 'number', required: true},
    valueDate: { type: 'date', required: true },
    currencyPair: { required: true }
  },

  derived: {
    spread: {
      deps: ['bid', 'ask', 'currencyPair'],
      fn: function() {
        var ask = this.ask
        var bid = this.bid
        return (ask - bid) * Math.pow(10, this.currencyPair.pipsPosition)
      }
    },

    formattedBid: {
      deps: ['bid'],
      fn: function() {
        var precision = this.currencyPair.ratePrecision
        var pipsPos = this.currencyPair.pipsPosition
        var formatted = PriceFormatter.getFormattedPrice(this.bid, precision, pipsPos)
        return formatted
      }
    },

    formattedAsk: {
      deps: ['ask'],
      fn: function() {
        var precision = this.currencyPair.ratePrecision
        var pipsPos = this.currencyPair.pipsPosition
        var formatted = PriceFormatter.getFormattedPrice(this.ask, precision, pipsPos)
        return formatted
      }
    },

    formattedSpread: {
      deps: ['spread'],
      fn: function() {
        var precision = this.currencyPair.ratePrecision
        var pipsPos = this.currencyPair.pipsPosition
        var spread = PriceFormatter.getFormattedSpread(this.spread, precision, pipsPos)
        return spread
      }
    }
  }
})
