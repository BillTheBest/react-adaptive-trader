export default class ConnectionInfo {
  constructor(connectionStatus, server, connectionType) {
    this.connectionStatus = connectionStatus;
    this.server = server;
    this.connectionType = connectionType;
  }

  toString() {
    return 'ConnectionStatus: ' + this.connectionStatus + ', Server: ' + this.server + ', Type: ' + this.connectionType;
  }
}
