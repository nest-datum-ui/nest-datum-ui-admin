import { 
	EntityController as DefaultEntityController,
	EntityService as DefaultEntityService, 
} from '@nest-datum/entity';
import { Entity } from './entity.jsx';

export class EntityController extends DefaultEntityController {
	constructor(entityService) {
		super(entityService ?? new DefaultEntityService(new Entity()));
	}

	async vlidatePropertiesMount(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async mount(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.mount(await this.vlidatePropertiesMount(propertiesData)));
	}
}
