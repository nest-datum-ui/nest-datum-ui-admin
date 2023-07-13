import { ReduxReducerModelService } from '@nest-datum-ui/redux-reducer-model';
import { LayoutEntity } from './layout.entity.js';

export class LayoutService extends ReduxReducerModelService {
	constructor(repository) {
		super(repository ?? new LayoutEntity());
	}
}
