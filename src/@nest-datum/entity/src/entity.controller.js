import { EntityService } from './entity.service.js';
import { Entity } from './entity.js';

export class EntityController {
	constructor(entityService = new EntityService(new Entity())) {
		this.entityService = entityService;
	}
}
