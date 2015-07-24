import ReferenceDataService from './referenceDataService.js'
import PriceService from './priceService.js'

// TODO Some way to switch from simulators to SignalR
import simulators from './serviceClients/simulators/index.js'

let referenceDataService = new ReferenceDataService(simulators.referenceDataServiceClient)
let priceService = new PriceService(simulators.pricingServiceClient)

export default { referenceDataService, priceService }
