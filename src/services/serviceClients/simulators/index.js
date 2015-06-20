import CurrencyPairInfoRepository from './repositories/currencyPairInfoRepository.js';
import SimulatorReferenceDataServiceClient from './simulatorReferenceDataServiceClient.js';

let currencyPairInfoRepository = new CurrencyPairInfoRepository();
let referenceDataServiceClient = new SimulatorReferenceDataServiceClient(currencyPairInfoRepository);

export default { referenceDataServiceClient };
