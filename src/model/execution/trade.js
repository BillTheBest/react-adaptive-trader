export default class Trade {
    constructor(currencyPair, direction, notional, spotRate, tradeStatus, tradeDate, tradeId, traderName, valueDate, dealtCurrency) {

        this.currencyPair = currencyPair;
        this.direction = direction;
        this.notional = notional;
        this.spotRate = spotRate;
        this.tradeStatus = tradeStatus;
        this.tradeDate = new Date(tradeDate);
        this.tradeId = tradeId;
        this.traderName = traderName;
        this.valueDate = new Date(valueDate);
        this.dealtCurrency = dealtCurrency;
    }
}
