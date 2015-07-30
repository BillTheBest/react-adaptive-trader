import Rx from 'rx';
import ConnectionType from './connectionType.js';
import ConnectionInfo from './connectionInfo.js';
import ConnectionStatus from './connectionStatus.js';
import $ from 'jquery';
import 'ms-signalr-client';

export default class Connection {
    constructor(address, username) {
      this._status = new Rx.BehaviorSubject(new ConnectionInfo(ConnectionStatus.Uninitialized, address, ConnectionType.None));
      this._address = address;

      if (address !== '') {
          this._hubConnection = $.hubConnection(address);
      } else {
          this._hubConnection = $.hubConnection();
          this._address = window.location.protocol + '//' + window.location.host;
      }

      this._hubConnection.qs = { 'User': username };

      this._hubConnection
          .disconnected(() => this.changeStatus(ConnectionStatus.Closed, ConnectionType.None))
          .connectionSlow(() => this.changeStatus(ConnectionStatus.ConnectionSlow, this.getConnectionType()))
          .reconnected(() => this.changeStatus(ConnectionStatus.Reconnected, this.getConnectionType()))
          .reconnecting(() => this.changeStatus(ConnectionStatus.Reconnecting, ConnectionType.None))
          .error(error => console.log(error));

      this._referenceDataHubProxy = this._hubConnection.createHubProxy('ReferenceDataHub');
      this._blotterHubProxy = this._hubConnection.createHubProxy('BlotterHub');
      this._executionHubProxy = this._hubConnection.createHubProxy('ExecutionHub');
      this._pricingHubProxy = this._hubConnection.createHubProxy('PricingHub');
      this._analyticsHubProxy = this._hubConnection.createHubProxy('AnalyticsHub');

      this._installListeners();
    }

    initialize() {
      return Rx.Observable.create(observer=> {
        this.changeStatus(ConnectionStatus.Connecting, ConnectionType.None);

        console.log('Connecting to ' + this._address + '...');
        this._hubConnection.start()
            .done(()=> {
                this.changeStatus(ConnectionStatus.Connected, this.getConnectionType());
                observer.onNext(true);
                console.log('Connected to ' + this._address + '.');
            })
            .fail(()=> {
                this.changeStatus(ConnectionStatus.Closed, ConnectionType.None);
                var error = 'An error occured when starting SignalR connection.';
                console.log(error);
                observer.onError(error);
            });

        return Rx.Disposable.create(()=> {
            console.log('Stopping connection...');
            this._hubConnection.stop();
            console.log('Connection stopped.');
        });
      })
      .publish()
      .refCount();
    }

    getConnectionType() {
      switch(this._hubConnection.transport.name)
      {
        case 'webSockets':
            return ConnectionType.WebSocket;
        case 'foreverFrame':
            return ConnectionType.ForeverFrame;
        case 'serverSentEvents':
            return ConnectionType.ServerSentEvents;
        case 'longPolling':
            return ConnectionType.LongPolling;
        default:
            return ConnectionType.None;
      }
    }

    changeStatus(newStatus, connectionType) {
        this._status.onNext(new ConnectionInfo(newStatus, this.address, connectionType));
    }

    getStatus() {
        return this._status;
    }

    getAddress() {
        return this._address;
    }

    getReferenceDataHubProxy() {
        return this._referenceDataHubProxy;
    }

    getPricingHubProxy() {
        return this._pricingHubProxy;
    }

    getExecutionHubProxy() {
        return this._executionHubProxy;
    }

    getBlotterHubProxy() {
        return this._blotterHubProxy;
    }

    getAnalyticsHubProxy() {
        return this._analyticsHubProxy;
    }

    getAllPrices() {
        return this._allPrices;
    }

    getCurrencyPairUpdates() {
        return this._currencyPairUpdates;
    }

    getAllTrades() {
        return this._allTrades;
    }

    getPositionUpdates() {
        return this._positionUpdates;
    }

    _installListeners() {
        this._allPrices = new Rx.Subject();
        this._currencyPairUpdates = new Rx.Subject();
        this._allTrades = new Rx.Subject();
        this._positionUpdates = new Rx.Subject();

        this._pricingHubProxy.on('OnNewPrice', price=> this._allPrices.onNext(price));
        this._referenceDataHubProxy.on('OnCurrencyPairUpdate', currencyPairs=> this._currencyPairUpdates.onNext(currencyPairs));
        this._blotterHubProxy.on('OnNewTrade', trades=> this._allTrades.onNext(trades));
        this._analyticsHubProxy.on('OnNewAnalytics', analytics=> this._positionUpdates.onNext(analytics));
    }
}
