import { v4 as uuidv4 } from 'uuid';
import { Entity } from './entity.js';

export class EntityService {
	constructor(repository, payloadData = {}) {
		this.repository = repository ?? new Entity();
	}

	oneGetColumns(customColumns = {}) {
		return customColumns;
	}

	manyGetColumns(customColumns = {}) {
		return customColumns;
	}

	manyQueryColumns(customColumns = {}) {
		return customColumns;
	}

	async before(properties = {}) {
		return properties;
	}

	async after(properties = {}, output) {
		return properties;
	}

	async process(properties = {}, output) {
		return output;
	}

	async many(properties = {}) {
		await this.manyBefore(properties);

		const propertiesProcessed = await this.manyProperties(properties);
		const output = await this.manyProcess(propertiesProcessed);
		const outputProcessed = await this.manyOutput(propertiesProcessed, output);

		await this.manyAfter(propertiesProcessed, outputProcessed);

		return outputProcessed;
	}

	async manyBefore(properties = {}) {
		return await this.before(properties);
	}

	async manyProperties(properties = {}) {
		return properties;
	}

	async manyProcess(properties = {}) {
		return await this.process(properties, await this.repository.findAndCount(properties));
	}

	async manyOutput(properties = {}, output) {
		return output;
	}

	async manyAfter(properties = {}, output) {
		return await this.after(properties, output);
	}

	async one(properties = {}) {
		await this.oneBefore(properties);

		const propertiesProcessed = await this.oneProperties(properties);
		const output = await this.oneProcess(propertiesProcessed);
		const outputProcessed = await this.oneOutput(propertiesProcessed, output);

		await this.oneAfter(propertiesProcessed, outputProcessed);

		return outputProcessed;
	}

	async oneBefore(properties = {}) {
		return await this.before(properties);
	}

	async oneProperties(properties = {}) {
		return await this.manyProperties(properties);
	}

	async oneProcess(properties = {}) {
		return await this.process(properties, await this.repository.findOne(properties));
	}

	async oneOutput(properties = {}, output) {
		return output;
	}

	async oneAfter(properties = {}, output) {
		return await this.after(properties, output);
	}

	async create(properties = {}) {
		await this.createBefore(properties);

		const propertiesProcessed = await this.createProperties(properties);
		const output = await this.createProcess(propertiesProcessed);
		const outputProcessed = await this.createOutput(propertiesProcessed, output);

		await this.createAfter(propertiesProcessed, outputProcessed);

		return outputProcessed;
	}

	async createBefore(properties = {}) {
		return await this.before(properties);
	}

	async createProperties(properties = {}) {
		return {
			...properties,
			id: properties['id'] ?? uuidv4(),
		};
	}

	async createProcess(properties = {}) {
		return await this.process(properties, await this.repository.save(properties));
	}

	async createOutput(properties = {}, output) {
		return output;
	}

	async createAfter(properties = {}, output) {
		return await this.after(properties, output);
	}

	async update(properties = {}) {
		await this.updateBefore(properties);

		const propertiesProcessed = await this.updateProperties(properties);
		const output = await this.updateProcess(propertiesProcessed);
		const outputProcessed = await this.updateOutput(propertiesProcessed, output);

		await this.updateAfter(propertiesProcessed, outputProcessed);

		return outputProcessed;
	}

	async updateBefore(properties = {}) {
		return await this.before(properties);
	}

	async updateProperties(properties = {}) {
		return properties;
	}

	async updateProcess(properties = {}) {
		return await this.process(properties, await this.repository.update({ id: properties['id'] }, properties));
	}

	async updateOutput(properties = {}, output) {
		return output;
	}

	async updateAfter(properties = {}, output) {
		return await this.after(properties, output);
	}

	async drop(properties = {}) {
		await this.dropBefore(properties);

		const propertiesProcessed = await this.dropProperties(properties);
		const output = await this.dropProcess(propertiesProcessed);
		const outputProcessed = await this.dropOutput(propertiesProcessed, output);

		await this.dropAfter(propertiesProcessed, outputProcessed);

		return outputProcessed;
	}

	async dropBefore(properties = {}) {
		return await this.before(properties);
	}

	async dropProperties(properties = {}) {
		return await this.oneProperties(properties);
	}

	async dropProcess(properties = {}) {
		return await this.process(properties, await this.repository.delete(properties));
	}

	async dropOutput(properties = {}, output) {
		return output;
	}

	async dropAfter(properties = {}, output) {
		return await this.after(properties);
	}
}
