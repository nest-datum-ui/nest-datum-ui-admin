import { EntityService } from './entity.service.js';
import { Entity } from './entity.js';

export class EntityController {
	constructor(entityService) {
		this.entityService = entityService ?? new EntityService(new Entity());
	}

	async vlidateProperties(propertiesData) {
		return propertiesData;
	}

	async vlidatePropertiesMany(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async vlidatePropertiesOne(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async vlidatePropertiesDrop(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async vlidatePropertiesCreate(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async vlidatePropertiesUpdate(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async many(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.many(await this.vlidatePropertiesMany(propertiesData)));
	}

	async one(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.one(await this.vlidatePropertiesOne(propertiesData)));
	}

	async drop(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.drop(await this.vlidatePropertiesDrop(propertiesData)));
	}

	async create(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.create(await this.vlidatePropertiesCreate(propertiesData)));
	}

	async update(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.update(await this.vlidatePropertiesUpdate(propertiesData)));
	}

	async errorHandler(callback = () => {}) {
		try {
			const output: any = callback
				? (await callback())
				: (await super.errorHandler());

			/*if (output instanceof Exception) {
				throw new output['httpExceptionConstructor'](output.message);
			}
			else */if (output instanceof Error) {
				throw new Error(output.message);
				// throw new FailureException(output.message);
			}
			return output;
		}
		catch (err) {
			// if (!(err instanceof Exception)) {
			// 	throw new FailureException(err.message);
			// }
			throw err;
		}
	}
}
