import ReferenceDataService from './referenceDataService.js';

// TODO Some way to switch from simulators to SignalR
import simulators from './serviceClients/simulators/index.js';

let referenceDataService = new ReferenceDataService(simulators.referenceDataServiceClient);

export default { referenceDataService };
