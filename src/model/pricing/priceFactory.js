import ExecutablePrice from './executablePrice.js';
import Price from './price.js';

export default class PriceFactory  {

  constructor(executionRepository) {
      this._executionRepository = executionRepository;
  }

  create(priceDto, currencyPair) {
      var bid = new ExecutablePrice(Direction.Sell, priceDto.bid, this._executionRepository);
      var ask = new ExecutablePrice(Direction.Buy, priceDto.ask, this._executionRepository);
      var valueDate = new Date(priceDto.valueDate);
      var price = new Price(bid, ask, valueDate, currencyPair);
      return price;
  }
}
