import Rx from 'rx';
import Stale from 'model/stale.js';

function register() {
  if (!Rx.Observable.prototype.detectStale ){
    Rx.Observable.prototype.detectStale = function(stalenessPeriodMs, scheduler) {
      return Rx.Observable.create(observer => {
          var timerSubscription = new Rx.SerialDisposable();
          timerSubscription.setDisposable(Rx.Disposable.empty);

          var scheduleStale = () => {
              timerSubscription.setDisposable(Rx.Observable
                  .timer(stalenessPeriodMs, scheduler)
                  .subscribe(
                  () => {
                      observer.onNext(new Stale(true, null));
                  }));
          };

          var sourceSubscription = this.subscribe(
              x => {
                  // cancel any scheduled stale update
                  timerSubscription.getDisposable().dispose();

                  observer.onNext(new Stale(false, x));

                  scheduleStale();
              },
              ex => observer.onError(ex),
              () => observer.onCompleted());

          scheduleStale();

          return new Rx.CompositeDisposable(sourceSubscription, timerSubscription);
      });
    };
  }
}

// TODO figure out how to actually export properly
export default { register };
