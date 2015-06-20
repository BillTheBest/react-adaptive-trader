import _ from 'lodash';

export default class CurrencyPairInfoRepository {
  constructor() {
    this._ccyPairs = [];
    this._createCurrencyPairInfo('EURUSD', 4, 5, 1.3629, true);
    this._createCurrencyPairInfo('USDJPY', 2, 3, 102.14, true);
    this._createCurrencyPairInfo('GBPUSD', 4, 5, 1.6395, true);
    this._createCurrencyPairInfo('GBPJPY', 2, 3, 167.67, true);
    //this._createCurrencyPairInfo('EURGBP', 4, 5, 0.8312, false);
    //this._createCurrencyPairInfo('USDCHF', 4, 5, 0.897,  false);
    this._createCurrencyPairInfo('EURJPY', 2, 3, 139.22, true);
    //this._createCurrencyPairInfo('EURCHF', 4, 5, 1.2224, false);
    this._createCurrencyPairInfo('AUDUSD', 4, 5, 0.8925, true);
    this._createCurrencyPairInfo('NZDUSD', 4, 5, 0.8263, true);
    this._createCurrencyPairInfo('USDCAD', 4, 5, 1.1043, true);
    this._createCurrencyPairInfo('EURCAD', 4, 5, 1.5062, true);
    this._createCurrencyPairInfo('EURAUD', 4, 5, 1.5256, true);
    //this._createCurrencyPairInfo('AUDCAD', 4, 5, 0.9873, false);
    //this._createCurrencyPairInfo('GBPCHF', 4, 5, 1.4723, false);
    //this._createCurrencyPairInfo('CHFJPY', 2, 3, 113.8591, false);
    //this._createCurrencyPairInfo('AUDJPY', 2, 3, 91.3133, false);
    //this._createCurrencyPairInfo('AUDNZD', 4, 5, 1.0807, false);
    //this._createCurrencyPairInfo('CADUSD', 4, 5, 0.9054, false);
    //this._createCurrencyPairInfo('CADJPY', 2, 3, 92.4686, false);
    //this._createCurrencyPairInfo('CHFUSD', 4, 5, 1.1148, false);
    //this._createCurrencyPairInfo('EURNOK', 4, 4, 8.3613, false);
    //this._createCurrencyPairInfo('EURSEK', 4, 4, 8.8505, false);
  }

  _createCurrencyPairInfo(symbol, pipsPosition, ratePrecision, sampleRate, enabled) {
    var currencyPairInfo = {
      currencyPair: {
        pipsPosition: pipsPosition,
        ratePrecision: ratePrecision,
        symbol: symbol
      },
      sampleRate: sampleRate,
      enable: enabled
    };

    this._ccyPairs.push(currencyPairInfo);
  }

  getAllCurrencyPairs() {
      return this._ccyPairs;
  }

  getCurrencyPair(currencyPairSymbol) {
      return _.find(this.getAllCurrencyPairs(), ccyPair => ccyPair.currencyPair.Symbol === currencyPairSymbol);
  }
}
