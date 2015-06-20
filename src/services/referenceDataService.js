import CurrencyPair from 'model/currencyPair.js';
import CurrencyPairUpdate from 'model/currencyPairUpdate.js';

export default class ReferenceDataService {
  constructor(referenceDataServiceClient) {
    this._referenceDataServiceClient = referenceDataServiceClient;
  }

  /**
   * Gets a stream of currency pair updates
   * @returns IObservable<CurrencyPairUpdate[]>
   */
  getCurrencyPairUpdatesStream() {
    return this._referenceDataServiceClient.getCurrencyPairUpdatesStream()
      .where(updates => updates.length > 0)
      .select(updates => {
        return updates.map(u => {
          var ccyPairUpdate = new CurrencyPairUpdate({
            currencyPair: new CurrencyPair(u.currencyPair),
            updateType: u.updateType
          });
          return ccyPairUpdate;
        });
      });
  }
}
