import Rx from 'rx';

export default class TradeRepository {

    constructor(blotterServiceClient, tradeFactory) {
        this._tradeFactory = tradeFactory;
        this._blotterServiceClient = blotterServiceClient;
    }

    getTradesStream() {
        return Rx.Observable.defer(()=> this._blotterServiceClient.getTradesStream())
            .select(trades=> this._createTrades(trades))
            .catch(()=> Rx.Observable.return([]))
            .repeat()
            .publish()
            .refCount();
    }

    _createTrades(trades) {
        var result = [];

        for (var i = 0; i < trades.length; i++) {
            result[i] = this._tradeFactory.create(trades[i]);
        }

        return result;
    }
}
