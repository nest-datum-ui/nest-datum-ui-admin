import { EntityService } from '@nest-datum/entity';
import { ReduxModelEntity } from './redux-model.entity.js';

export class ReduxModelService extends EntityService {
	constructor(repository = new ReduxModelEntity()) {
		super(repository);
	}
}
