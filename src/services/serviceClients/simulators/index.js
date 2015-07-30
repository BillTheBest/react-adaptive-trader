import CurrencyPairInfoRepository from './repositories/currencyPairInfoRepository.js';
import SimulatorReferenceDataServiceClient from './simulatorReferenceDataServiceClient.js';
import SimulatorPricingServiceClient from './simulatorPricingServiceClient.js';
import SimulatorExecutionServiceClient from './simulatorExecutionServiceClient.js';
import SimulatorBlotterServiceClient from './simulatorBlotterServiceClient.js';

let currencyPairInfoRepository = new CurrencyPairInfoRepository();
let referenceDataServiceClient = new SimulatorReferenceDataServiceClient(currencyPairInfoRepository);
let pricingServiceClient = new SimulatorPricingServiceClient(currencyPairInfoRepository);
let blotterServiceClient = new SimulatorBlotterServiceClient();
let executionServiceClient = new SimulatorExecutionServiceClient(blotterServiceClient);

export default { referenceDataServiceClient, pricingServiceClient, blotterServiceClient, executionServiceClient };
