import Rx from 'rx';

export class TradeRepository  {

    constructor(blotterServiceClient, tradeFactory) {
        this._tradeFactory = tradeFactory;
        this._blotterServiceClient = blotterServiceClient;
    }

    public getTradesStream() {
        return Rx.Observable.defer(()=> this._blotterServiceClient.getTradesStream())
            .select(trades=> this._createTrades(trades))
            .catch(()=> Rx.Observable.return([]))
            .repeat()
            .publish()
            .refCount();
    }

    _createTrades(trades:ITradeDto[]):ITrade[] {
        var result = [];

        for (var i = 0; i < trades.length; i++) {
            result[i] = this._tradeFactory.create(trades[i]);
        }

        return result;
    }
}

var repo = new TradeRepository();
export default repo;