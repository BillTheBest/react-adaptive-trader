import Rx from 'rx'

export default class SimulatorBlotterServiceClient {
  constructor() {
    this.tradeSubject = new Rx.Subject()
  }

  getTradesStream() {
    return this._subject.startWith([])
  }

  publishTrade(tradeDto) {
    this._subject.onNext([tradeDto])
  }
}
