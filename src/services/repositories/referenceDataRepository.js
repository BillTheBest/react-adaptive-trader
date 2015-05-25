module Babylon {
    export class ReferenceDataRepository implements IReferenceDataRepository {
        private _referenceDataServiceClient:IReferenceDataServiceClient;
        private _currencyPairUpdateFactory:ICurrencyPairUpdateFactory;

        constructor(referenceDataServiceClient:IReferenceDataServiceClient, currencyPairUpdateFactory:ICurrencyPairUpdateFactory) {

            this._currencyPairUpdateFactory = currencyPairUpdateFactory;
            this._referenceDataServiceClient = referenceDataServiceClient;
        }

        getCurrencyPairsStream():Rx.Observable<ICurrencyPairUpdate[]> {
            return Rx.Observable.defer(()=> this._referenceDataServiceClient.getCurrencyPairUpdatesStream())
                .where(update=> update.updates.length > 0)
                .select(update=> this.createCurrencyPairUpdates(update.updates))
                .catch(Rx.Observable.return([]))
                .repeat()
                .publish()
                .refCount();
        }

        private createCurrencyPairUpdates(updates:CurrencyPairUpdateDto[]):ICurrencyPairUpdate[] {
            var result = [];

            for (var i = 0; i < updates.length; i++) {
                result[i] = this._currencyPairUpdateFactory.create(updates[i]);
            }

            return result;
        }
    }
}