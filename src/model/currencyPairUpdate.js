import AmpersandState from 'ampersand-state';
import isProduction from 'services/isProduction.js';

let extraProperties = 'reject';
if (isProduction()){
  extraProperties = 'ignore';
}

export default AmpersandState.extend({
  extraProperties: extraProperties,
  props: {
    symbol: { type: 'state', required: true },
    updateType: { type: 'string', required: true, values: ['add', 'remove'] }
  }
});
