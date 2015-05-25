module Babylon {
    import IStale = Rx.IStale;

    export class ExecutionRepository implements IExecutionRepository {
        private _executionServiceClient:IExecutionServiceClient;
        private _tradeFactory:ITradeFactory;

        constructor(executionServiceClient:IExecutionServiceClient, tradeFactory:ITradeFactory) {
            this._tradeFactory = tradeFactory;
            this._executionServiceClient = executionServiceClient;
        }

        executeRequest(executablePrice:IExecutablePrice, notional:number, dealtCurrency:string):Rx.Observable<IStale<ITrade>> {
            var price = executablePrice.parent;

            var request = new ExecuteTradeRequestDto();
            request.direction = executablePrice.direction == Direction.Buy ? DirectionDto.BUY : DirectionDto.SELL;
            request.notional = notional;
            request.spotRate = executablePrice.rate;
            request.currencyPair = price.currencyPair.symbol;
            request.valueDate = price.valueDate.toISOString();
            request.dealtCurrency = dealtCurrency;


            //.select(tradeDto => this._tradeFactory.create(tradeDto))
            return this._executionServiceClient.executeTrade(request)
                .select(response => this._tradeFactory.create(response.trade))
                .detectStale(2000, Rx.Scheduler.timeout);
        }
    }
}