import Rx from 'rx'

export default class SimulatorBlotterServiceClient {
  constructor() {
    this._tradeSubject = new Rx.Subject()
  }

  getTradesStream() {
    return this._tradeSubject.startWith([])
  }

  publishTrade(tradeDto) {
    this._tradeSubject.onNext([tradeDto])
  }
}
