import { ReduxReducerModelController } from '@nest-datum-ui/redux-reducer-model';
import { LayoutService } from './layout.service.js';
import { LayoutEntity } from './layout.entity.js';

export class LayoutController extends ReduxReducerModelController {
	constructor(entityService) {
		super(entityService ?? new LayoutService(new LayoutEntity()));
	}
}
