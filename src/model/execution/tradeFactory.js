module Babylon {
    export class TradeFactory implements ITradeFactory {
        create(trade:ITradeDto) {
            return new Trade(
                trade.currencyPair,
                    trade.direction == DirectionDto.BUY ? Direction.Buy : Direction.Sell,
                trade.notional,
                trade.spotRate,
                    trade.status == TradeStatusDto.DONE ? TradeStatus.Done : TradeStatus.Rejected,
                trade.tradeDate,
                trade.tradeId,
                trade.traderName,
                trade.valueDate,
                trade.dealtCurrency);
        }
    }
}