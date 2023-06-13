import { EntityController } from '@nest-datum/entity';
import { ReduxService } from './redux.service.js';
import { ReduxEntity } from './redux.entity.js';

export class ReduxController extends EntityController {
	constructor(entityService = new ReduxService(new ReduxEntity())) {
		super(entityService);

		this.entityService = entityService;

		return this.entityService.repository.EntityComponentWrapper;
	}
}
