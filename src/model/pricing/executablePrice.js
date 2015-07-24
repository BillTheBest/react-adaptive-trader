import AmpersandState from 'ampersand-state'
import extraProperties from 'services/extraProperties.js'

export default AmpersandState.extend({
  extraProperties: extraProperties(),
  props: {
    direction: { type: 'string', required: true, values: ['bid', 'ask'] },
    rate: { type: 'number', required: true }
  }//,

  // execute: (notional, dealtCurrency) => {
  //   return executionRepository.executeRequest(this, notional, dealtCurrency)
  // }
})
