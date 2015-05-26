import CurrencyPair from './currencyPair.js';
import CurrencyPairUpdate from './currencyPairUpdate';
import UpdateType from '../updateType.js';

export default class CurrencyPairUpdateFactory {

  constructor(priceRepository:IPriceRepository) {
      this._priceRepository = priceRepository;
  }

  create(currencyPairUpdate) {
      var cp = new CurrencyPair(
          currencyPairUpdate.currencyPair.symbol,
          currencyPairUpdate.currencyPair.ratePrecision,
          currencyPairUpdate.currencyPair.pipsPosition,
          this._priceRepository);

      throw('TODO import updateTypeDto');
      var updateType = currencyPairUpdate.updateType == UpdateTypeDto.ADDED ? UpdateType.Add : UpdateType.Remove; 
      var update = new CurrencyPairUpdate(updateType, cp);

      return update;
  }
}
