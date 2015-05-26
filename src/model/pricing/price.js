export default class Price  {

  constructor(bid, ask, valueDate, currencyPair) {
    this.bid = bid;
    this.ask = ask;
    this.valueDate = valueDate;
    this.currencyPair = currencyPair;
    this.isStale = false;

    bid.parent = this;
    ask.parent = this;

    this.spread = (ask.rate - bid.rate) * Math.pow(10, currencyPair.pipsPosition);
    this.mid = (this.bid.rate + this.ask.rate) / 2;
  }
}