import { ReduxModelController } from '@nest-datum-ui/redux-model';
import { LayoutService } from './layout.service.js';
import { LayoutEntity } from './layout.entity.js';

export class LayoutController extends ReduxModelController {
	constructor(entityService = new LayoutService(new LayoutEntity())) {
		super(entityService);
	}
}
