module Babylon {
    export class AnalyticsRepository implements IAnalyticsRepository {
        _analyticsServiceClient:IAnalyticsServiceClient;

        constructor(analyticsServiceClient:IAnalyticsServiceClient) {
            this._analyticsServiceClient = analyticsServiceClient;
        }

        public getAnalyticsStream() {
            return this._analyticsServiceClient
                .getAnalytics()
                .select(p => this.createPositions(p))
                .publish()
                .refCount();
        }

        private createPositions(dto:IPositionUpdatesDto) : PositionUpdates {

            var currentPositions = [];
            var historyResults = [];

            for (var i = 0; i < dto.currentPositions.length ; i++) {
                var positionDto = dto.currentPositions[i];

                var position = new CurrencyPairPosition();
                position.basePnl = positionDto.basePnl;
                position.baseTradedAmount = positionDto.baseTradedAmount;
                position.symbol = positionDto.symbol;
                currentPositions.push(position);
            }

            for (var i = 0; i < dto.history.length ; i++) {
                var historyDto = dto.history[i];

                var history = new HistoricPosition();
                history.timestamp = historyDto.timestamp;
                history.usdPnl = historyDto.usdPnl;

                historyResults[i] = history;
            }

            var result = new PositionUpdates();
            result.history  = historyResults;
            result.currentPositions = currentPositions;

            return result;
        }
    }
}