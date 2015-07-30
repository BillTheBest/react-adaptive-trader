import AmpersandState from 'ampersand-state';
import extraProperties from 'services/extraProperties.js';

export default AmpersandState.extend({
  extraProperties: extraProperties(),
  props: {
    currencyPair: { type: 'state', required: true },
    updateType: { type: 'string', required: true, values: ['add', 'remove'] }
  }
});
