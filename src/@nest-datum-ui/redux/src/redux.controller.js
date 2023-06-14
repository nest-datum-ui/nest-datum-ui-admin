import { combineReducers } from 'redux';
import { EntityController } from '@nest-datum/entity';
import { ReduxService } from './redux.service.js';
import { ReduxEntity } from './redux.entity.js';

export class ReduxController extends EntityController {
	constructor(entityService = new ReduxService(new ReduxEntity())) {
		super(entityService);

		this.entityService = entityService;
		this.entityService.repository.provideControllerInstance(this);

		return this.entityService.repository.EntityComponentWrapper;
	}

	async update(propertiesData) {
		const id = propertiesData['id'];

		delete propertiesData['id'];

		this.entityService.repository.store.replaceReducer(combineReducers({ ...propertiesData }));

		return { ...propertiesData, id };
	}
}
