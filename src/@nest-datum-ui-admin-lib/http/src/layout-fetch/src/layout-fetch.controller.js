import { LayoutLoaderController } from 'layout-loader';
import { LayoutFetchService } from './layout-fetch.service.js';
import { LayoutFetchEntity } from './layout-fetch.entity.js';

export class LayoutFetchController extends LayoutLoaderController {
	constructor(entityService) {
		super(entityService ?? new LayoutFetchService(new LayoutFetchEntity()));
	}

	async vlidatePropertiesRequest(propertiesData) {
		return await this.vlidateProperties(propertiesData);
	}

	async request(propertiesData) {
		return await this.errorHandler(async () => await this.entityService.request(await this.vlidatePropertiesRequest(propertiesData)));
	}
}
