module Babylon {
    export class CurrencyPairUpdateFactory implements ICurrencyPairUpdateFactory {
        private _priceRepository:IPriceRepository;

        constructor(priceRepository:IPriceRepository) {
            this._priceRepository = priceRepository;
        }

        create(currencyPairUpdate:CurrencyPairUpdateDto):ICurrencyPairUpdate {
            var cp = new CurrencyPair(
                currencyPairUpdate.currencyPair.symbol,
                currencyPairUpdate.currencyPair.ratePrecision,
                currencyPairUpdate.currencyPair.pipsPosition,
                this._priceRepository);

            var update = new CurrencyPairUpdate(
                    currencyPairUpdate.updateType == UpdateTypeDto.ADDED ? UpdateType.Add : UpdateType.Remove,
                <ICurrencyPair>cp);

            return update;
        }
    }
}