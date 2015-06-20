import Rx from 'rx';

export class ExecutionRepository {

    constructor(executionServiceClient, tradeFactory) {
        this._tradeFactory = tradeFactory;
        this._executionServiceClient = executionServiceClient;
    }

    executeRequest(executablePrice, notional, dealtCurrency) {
        var price = executablePrice.parent;

        var request = new ExecuteTradeRequestDto();
        request.direction = executablePrice.direction == Direction.Buy ? DirectionDto.BUY : DirectionDto.SELL;
        request.notional = notional;
        request.spotRate = executablePrice.rate;
        request.currencyPair = price.currencyPair.symbol;
        request.valueDate = price.valueDate.toISOString();
        request.dealtCurrency = dealtCurrency;

        return this._executionServiceClient.executeTrade(request)
            .select(response => this._tradeFactory.create(response.trade))
            .detectStale(2000, Rx.Scheduler.timeout);
    }
}
