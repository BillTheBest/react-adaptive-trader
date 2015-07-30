/**
 * Represents maybe stale
 */
export default class Stale {
  constructor(stale, update) {
    this.isStale = stale;
    this.update = update;
  }
}
