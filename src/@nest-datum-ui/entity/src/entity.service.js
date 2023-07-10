import { EntityService as DefaultEntityService } from '@nest-datum/entity';
import { Entity } from './entity.jsx';

export class EntityService extends DefaultEntityService {
	constructor(repository, payloadData = {}) {
		super(repository ?? new Entity(), payloadData);
	}

	async mount(propertiesData) {
		return propertiesData;
	}
}
