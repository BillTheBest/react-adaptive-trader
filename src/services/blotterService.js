export default class BlotterService {
  constructor(blotterServiceClient) {
    this._blotterServiceClient = blotterServiceClient
  }

  getTradesStream() {
    return this._blotterServiceClient.getTradesStream()
  }
}
