import { ReduxModelService } from '@nest-datum-ui/redux-model';
import { LayoutEntity } from './layout.entity.js';

export class LayoutService extends ReduxModelService {
	constructor(repository = new LayoutEntity()) {
		super(repository);
	}
}
