import CurrencyPairPosition from 'model/analytics/currencyPairPosition.js';
import HistoricPosition from 'model/analytics/historicPosition.js';

export class AnalyticsRepository {

    constructor(analyticsServiceClient) {
        this._analyticsServiceClient = analyticsServiceClient;
    }

    getAnalyticsStream() {
        return this._analyticsServiceClient
            .getAnalytics()
            .select(p => this._createPositions(p))
            .publish()
            .refCount();
    }

    _createPositions(dto) {

        var currentPositions = [];
        var historyResults = [];

        for (let i = 0; i < dto.currentPositions.length; i++) {
            var positionDto = dto.currentPositions[i];

            var position = new CurrencyPairPosition();
            position.basePnl = positionDto.basePnl;
            position.baseTradedAmount = positionDto.baseTradedAmount;
            position.symbol = positionDto.symbol;
            currentPositions.push(position);
        }

        for (let i = 0; i < dto.history.length; i++) {
            var historyDto = dto.history[i];

            var history = new HistoricPosition();
            history.timestamp = historyDto.timestamp;
            history.usdPnl = historyDto.usdPnl;

            historyResults[i] = history;
        }

        var result = new PositionUpdates();
        result.history = historyResults;
        result.currentPositions = currentPositions;

        return result;
    }
}
