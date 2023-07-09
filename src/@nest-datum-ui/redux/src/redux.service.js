import { EntityService } from '@nest-datum/entity';
import { ReduxEntity } from './redux.entity.js';

export class ReduxService extends EntityService {
	constructor(repository, payloadData = {}) {
		super(repository ?? new ReduxEntity(), payloadData);

		(async () => await repository.save({ ...repository.columnsInstance(), ...payloadData }))();
	}
}
