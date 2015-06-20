import Rx from 'rx';
import CurrencyPair from 'model/currencyPair.js';
import CurrencyPairUpdate from 'model/currencyPairUpdate.js';

export default class ReferenceDataRepository {
  constructor(referenceDataServiceClient) {
    this._referenceDataServiceClient = referenceDataServiceClient;
  }

  /**
   * Gets a stream of currency pair updates
   * @returns IObservable<CurrencyPairUpdate[]>
   */
  getCurrencyPairsStream() {
    return Rx.Observable.defer(()=> this._referenceDataServiceClient.getCurrencyPairUpdatesStream())
      .where(update => update.updates.length > 0)
      .select(update => update.updates.map(u => new CurrencyPairUpdate({
        currencyPair: new CurrencyPair(u.currencyPair),
        updateType: u.updateType
      })))
      .catch(Rx.Observable.return([]))
      .repeat()
      .publish()
      .refCount();
  }
}
