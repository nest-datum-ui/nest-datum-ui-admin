import { LayoutLoaderService } from 'layout-loader';
import { LayoutFetchEntity } from './layout-fetch.entity.js';

export class LayoutFetchService extends LayoutLoaderService {
	constructor(repository) {
		super(repository ?? new LayoutFetchEntity());
	}

	async request(propertiesData) {
		// const { method, url, ...queryData } = propertiesData;

		return {
			test: '1111111111111111111',
		};
	}

	async manyProcess(properties = {}) {
		return await this.process(properties, await this.repository.save(await this.request({ method: 'GET', ...properties })));
	}

	async oneProcess(properties = {}) {
		return await this.process(properties, await this.repository.findOne(await this.request({ method: 'GET', ...properties })));
	}

	async createProcess(properties = {}) {
		return await this.process(properties, await this.repository.create(await this.request({ method: 'POST', ...properties })));
	}

	async updateProcess(properties = {}) {
		return await this.process(properties, await this.repository.update(await this.request({ method: 'PATCH', ...properties })));
	}

	async dropProcess(properties = {}) {
		return await this.process(properties, await this.repository.delete(await this.request({ method: 'DELETE', ...properties })));
	}
}
