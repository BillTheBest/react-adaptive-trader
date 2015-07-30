import Rx from 'rx';

export default class LimitCheckService {
  checkLimit(/*request*/) {
    // TODO Limit check
    return Rx.Observable.returnValue(true);
  }
}
