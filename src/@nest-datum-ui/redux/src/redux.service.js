import { EntityService } from '@nest-datum/entity';
import { ReduxEntity } from './redux.entity.js';

export class ReduxService extends EntityService {
	constructor(repository = new ReduxEntity(), payloadData = {}) {
		super(repository, payloadData);
	}
}
