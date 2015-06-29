import AmpersandState from 'ampersand-state'
import extraProperties from 'services/extraProperties.js'

export default AmpersandState.extend({
  extraProperties: extraProperties(),
  props: {
    currencyPair: { type: 'string', required: true },
    direction: { type: 'string', required: true, values: ['bid', 'ask'] },
    notional: { type: 'number', required: true },
    spotRate: { type: 'number', required: true },
    tradeStatus: { type: 'string', required: true, values: [ 'done', 'rejected'] },
    tradeDate: { type: 'date', required: true },
    tradeId: { type: 'string', required: true },
    traderName: { type: 'string', required: true },
    dealtCurrency: { type: 'string', required: true }
  }
})
