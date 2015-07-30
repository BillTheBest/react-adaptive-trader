import Rx from 'rx';
import Connection from 'connection.js';

class ConnectionProvider {

  constructor(username, servers) {
    this._disposable = new Rx.SingleAssignmentDisposable();
    this._username = username;
    this._servers = servers;
    this._currentIndex = 0;
    // TODO shuffle server list
    this._connectionSequence = this.createConnectionSequence();
  }

  getActiveConnection(){
    return this._connectionSequence;
  }

  dispose() {
    this._disposable.dispose();
  }

  /**
   * @return IObservable<Connection>
   */
  createConnectionSequence() {
      return Rx.Observable.create(o => {
        console.info('Creating new connection...');

        var connection = this._getNextConnection();

        var statusSubscription = connection.status.subscribe(
          () => {},
          ex=> {
              console.error(ex);
              o.onCompleted();
          },
          ()=> {
              console.info('Status subscription completed');
              o.onCompleted();
          });

        // TODO if we fail to connect we should not retry straight away to connect to same server, we need some back off
        var connectionSubscription = connection.initialize().subscribe(
          () => o.onNext(connection),
          ex=> {
              console.error('Active connection errored:' + ex);
              o.onCompleted();
          },
          ()=> {
              console.warn('Active connection completed.');
              o.onCompleted();
          });

        return new Rx.CompositeDisposable(statusSubscription, connectionSubscription);
    })
    .repeat()
    .replay(null, 1)
    .lazyConnect(this._disposable);
  }

  _getNextConnection() {
    var connection = new Connection(this._servers[this._currentIndex], this._username);
    this._currentIndex++;
    if (this._currentIndex === this._servers.length) {
        this._currentIndex = 0;
    }
    return connection;
  }
}
