import CurrencyPairInfoRepository from './repositories/currencyPairInfoRepository.js'
import SimulatorReferenceDataServiceClient from './simulatorReferenceDataServiceClient.js'
import SimulatorPricingServiceClient from './simulatorPricingServiceClient.js'

let currencyPairInfoRepository = new CurrencyPairInfoRepository()
let referenceDataServiceClient = new SimulatorReferenceDataServiceClient(currencyPairInfoRepository)
let pricingServiceClient = new SimulatorPricingServiceClient(currencyPairInfoRepository)

export default { referenceDataServiceClient, pricingServiceClient }
