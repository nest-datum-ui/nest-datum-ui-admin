import { ReduxController } from '@nest-datum-ui/redux';
import { ReduxReducerService } from './redux-reducer.service.js';
import { ReduxReducerEntity } from './redux-reducer.entity.jsx';

export class ReduxReducerController extends ReduxController {
	constructor(entityService) {
		super(entityService ?? new ReduxReducerService(new ReduxReducerEntity()));
	}

	async update({ path, value }) {
		return value;
	}
}
