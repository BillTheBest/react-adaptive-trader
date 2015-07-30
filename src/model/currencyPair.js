import Rx from 'rx';
import AmpersandState from 'ampersand-state';
import extraProperties from 'services/extraProperties.js';
import { priceService } from 'services/index.js';

var CurrencyPair = AmpersandState.extend({
  extraProperties: extraProperties(),
  props: {
    symbol: { type: 'string', required: true },
    ratePrecision: { type: 'number', required: true },
    pipsPosition: { type: 'number', required: true }
  },

  derived: {
    baseCurrency: {
      deps: ['symbol'],
      fn: function() {
        return this.symbol.substring(0, 3);
      }
    },

    counterCurrency: {
      deps: ['symbol'],
      fn: function() {
        this.symbol.substring(3, 6);
      }
    },

    getPriceStream: function() {
      return Rx.Observable.defer(()=> priceService.getPriceStream(this));
    }
  }
});

export default CurrencyPair;
