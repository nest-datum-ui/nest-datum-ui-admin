import {
	arr as utilsCheckArr,
	obj as utilsCheckObj,
} from '@nest-datum-utils/check';
import { ReduxController } from '@nest-datum-ui/redux';
import { ReduxModelService } from './redux-model.service.js';
import { ReduxModelEntity } from './redux-model.entity.jsx';

export class ReduxModelController extends ReduxController {
	constructor(entityService) {
		super(entityService ?? new ReduxModelService(new ReduxModelEntity()));
	}

	async onSet(properties) {
		const path = [ ...properties.path ];
		const lastKey = path.pop();
		const value = properties.value;
		const state = this.entityService.repository.store.getState();
		let stateProcessed = state,
			i = 0;

		while (i < path.length) {
			if (utilsCheckArr(stateProcessed[path[i]])
				|| utilsCheckObj(stateProcessed[path[i]])) {
				stateProcessed = stateProcessed[path[i]];
			}
			i++;
		}
		if (utilsCheckArr(stateProcessed)
			|| utilsCheckObj(stateProcessed)) {
			stateProcessed[lastKey] = value;
		}
		return state;
	}
}
