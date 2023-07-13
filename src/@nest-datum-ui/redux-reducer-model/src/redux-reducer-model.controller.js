import { ReduxReducerController } from '@nest-datum-ui/redux-reducer';
import { ReduxReducerModelService } from './redux-reducer-model.service.js';
import { ReduxReducerModelEntity } from './redux-reducer-model.entity.jsx';

export class ReduxReducerModelController extends ReduxReducerController {
	constructor(entityService) {
		super(entityService ?? new ReduxReducerModelService(new ReduxReducerModelEntity()));
	}
}
