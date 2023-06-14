import { ReduxController } from '@nest-datum-ui/redux';
import { ReduxModelService } from './redux-model.service.js';
import { ReduxModelEntity } from './redux-model.entity.jsx';

export class ReduxModelController extends ReduxController {
	constructor(entityService = new ReduxModelService(new ReduxModelEntity())) {
		super(entityService);
	}
}
