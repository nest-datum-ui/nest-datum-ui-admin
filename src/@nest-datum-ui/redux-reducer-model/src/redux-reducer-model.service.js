import { ReduxReducerService } from '@nest-datum-ui/redux-reducer';
import { ReduxReducerModelEntity } from './redux-reducer-model.entity.jsx';

export class ReduxReducerModelService extends ReduxReducerService {
	constructor(repository) {
		super(repository ?? new ReduxReducerModelEntity());
	}
}
