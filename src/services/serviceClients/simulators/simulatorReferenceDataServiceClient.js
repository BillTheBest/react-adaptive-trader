import Rx from 'rx';

export default class SimulatorReferenceDataServiceClient {
    constructor(currencyPairRepository) {
      this.currencyPairRepository = currencyPairRepository;
    }

    getCurrencyPairUpdatesStream() {
      var ccyPairs = this.currencyPairRepository.getAllCurrencyPairs()
        .map(ccyPairInfo => {
          return {
            updateType: 'add',
            currencyPair: ccyPairInfo.currencyPair
          };
        });

      return Rx.Observable.timer(200, Rx.Scheduler.timeout)
        .select(() => ccyPairs)
        .concat(Rx.Observable.never());
    }
}
