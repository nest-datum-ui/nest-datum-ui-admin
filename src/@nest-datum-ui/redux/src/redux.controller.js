import { EntityController } from '@nest-datum/entity';
import { ReduxService } from './redux.service.js';
import { ReduxEntity } from './redux.entity.js';

export class ReduxController extends EntityController {
	constructor(entityService) {
		super(entityService ?? new ReduxService(new ReduxEntity()));

		this.entityService = entityService;
		this.entityService.repository.provideControllerInstance(this);

		return this.entityService.repository.EntityComponentWrapper;
	}
}
