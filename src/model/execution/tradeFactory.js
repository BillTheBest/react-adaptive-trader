import Trade from './trade.js'
import TradeStatus from './tradeStatus.js'
import Direction from '../direction.js'

export default class TradeFactory {
    create(trade) {
      throw('TODO import DTO')
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
            trade.dealtCurrency)
    }
}
