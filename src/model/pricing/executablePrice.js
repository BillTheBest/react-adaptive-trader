export default class ExecutablePrice {
    constructor(direction, rate, executionRepository) {
        this._executionRepository = executionRepository;
        this.direction = direction;
        this.rate = rate;
    }

    execute(notional, dealtCurrency) {
        return this._executionRepository.executeRequest(this, notional, dealtCurrency);
    }
}