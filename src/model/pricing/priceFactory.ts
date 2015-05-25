module Babylon {
    export class PriceFactory implements IPriceFactory {
        private _executionRepository:IExecutionRepository;

        constructor(executionRepository:IExecutionRepository) {
            this._executionRepository = executionRepository;
        }

        create(priceDto:SpotPriceDto, currencyPair:ICurrencyPair) : IPrice {
            var bid = new ExecutablePrice(Direction.Sell, priceDto.bid, this._executionRepository);
            var ask = new ExecutablePrice(Direction.Buy, priceDto.ask, this._executionRepository);
            var valueDate = new Date(priceDto.valueDate);
            var price = new Price(bid, ask, valueDate, currencyPair);
            return price;
        }
    }
}