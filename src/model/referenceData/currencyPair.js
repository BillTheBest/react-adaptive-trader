import Rx from 'rx';

export class CurrencyPair {

  constructor(symbol, ratePrecision, pipsPosition, priceRepository) {
      this.symbol = symbol;
      this.ratePrecision = ratePrecision;
      this.pipsPosition = pipsPosition;
      this.baseCurrency = symbol.substring(0, 3);
      this.counterCurrency = symbol.substring(3, 6);

      this.prices =
          Rx.Observable.defer(()=> priceRepository.getPriceStream(this))
              .publish()
              .refCount();
  }
}
