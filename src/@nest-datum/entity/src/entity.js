import { v4 as uuidv4 } from 'uuid';
import {
	objFilled as utilsCheckObjFilled,
	arr as utilsCheckArr,
	func as utilsCheckFunc,
	exists as utilsCheckExists,
	numericInt as utilsCheckNumericInt,
	strIdExists as utilsCheckStrIdExists,
} from '@nest-datum-utils/check';

let _saved = {
	'entity-default|id': 'entity-default',
};

setTimeout(() => {
	// console.log('_saved', _saved);
	console.log('_saved', _saved[(Object.keys(_saved).find((key) => key.includes('|store')))].getState());
}, 5000);

export class Entity {
	_index = 0;
	_service = undefined;
	_controller = undefined;
	id = uuidv4();
	name = '';

	constructor(...properties) {
		this.name = this.constructor.name;
	}

	instance() {
		return this;
	}

	instanceTree() {
		return [
			...(super.instanceTree
				? [ super.instanceTree() ]
				: []),
			this.id, 
		];
	}

	columns(exceptColumns = {}) {
		const self = this;

		return Object
			.keys(self)
			.filter((key) => (!utilsCheckFunc(self[key]) && !utilsCheckExists(exceptColumns[key]) && key !== '_index'));
	}

	columnsForSave(payloadData = {}) {
		let isError = false;
		const columns = this.columns();
		const payloadDataProcessed = Object
			.keys(payloadData)
			.filter((key, index) => {
				if (utilsCheckExists(columns.includes(key)) && index <= columns.length) {
					return true;
				}
				isError = true;

				return false;
			});

		if (isError) {
			throw new Error(`Entity "${this.constructor.name}" signature does not match the parameters passed to "save" method.`);
		}
		let i = 0,
			output = {};

		while (i < payloadDataProcessed.length) {
			output[payloadDataProcessed[i]] = payloadData[payloadDataProcessed[i]];
			i++;
		}
		return output;
	}

	columnsInstance() {
		const columns = this.columns();
		const output = {};
		let i = 0;

		while (i < columns.length) {
			if (columns[i] !== '_controller'
				&& columns[i] !== '_service') {
				output[columns[i]] = this[columns[i]];
			}
			i++;
		}
		return output;
	}

	entityInstance() {
		return this;
	}

	serviceInstance() {
		return this._service;
	}

	controllerInstance() {
		return this._controller;
	}

	provideServiceInstance(service) {
		return (this._service = service);
	}

	provideControllerInstance(controller) {
		return (this._controller = controller);
	}

	getData(path = [], data = _saved) {
		const currentKey = path.shift();

		return (path.length === 0)
			? data
			: ((path.length > 0)
				? this.getData([ ...path ], data)
				: data[currentKey]);
	}

	setData(path = [], value = '', data = _saved, index = 0) {
		return (path.length === 0)
			? (utilsCheckArr(data[path[index]])
				? data.push(value)
				: data = value)
			: (index === path.length - 1)
				? (utilsCheckArr(data[path[index]])
					? data[path[index]].push(value)
					: data[path[index]] = value)
				: this.setData(path, value, data[path[index]], index + 1);
	}

	delData(path = [], data = _saved, index = 0) {
		if (path.length === 0) {
			return false;
		}
		if (utilsCheckArr(data)) {
			data = data.join('').split('');
		}
		(index === path.length - 1)
			? delete data[path[index]]
			: this.delData(path, data[path[index]], index + 1);

		return true;
	}

	async findWhereQueryProcessorsLike(source = '', value = '') {
		const borderIndex = value.indexOf('%');
		const valueProcessed = value.split('').slice(1).slice(1).slice(0, -1).join('');

		return (borderIndex === 0 && borderIndex === value.length - 1)
			? source.includes(valueProcessed)
			: ((borderIndex === 0)
				? (source.indexOf(valueProcessed) === 0)
				: (source.indexOf(valueProcessed) > 0));
	}

	async findWhereQueryProcessors() {
		return {
			'$Like': this.findWhereQueryProcessorsLike,
		}
	}

	async find(queryData = {}) {
		const selectKeys = Object.keys(queryData['select'] || {});
		const where = this.columnsForSave(Object(queryData['where'] || {}));
		const whereKeys = Object.keys(where);
		const idsKeys = Object
			.keys(this.getData())
			.filter((key) => key.includes('|id'));
		let i = 0,
			rows = [];

		while (i < idsKeys.length) {
			let ii = 0,
				iii = 0,
				id = String((idsKeys[i].split('|'))[0]),
				prepareRows = {};

			while (ii < whereKeys.length) {
				const whereKey = whereKeys[ii];
				const whereValue = where[whereKey];

				if (_saved[`${id}|${whereKey}`] === whereValue) {
					prepareRows['id'] = id;
					iii = 0;

					while (iii < selectKeys.length) {
						const selectKey = selectKeys[iii];
						const key = `${id}|${selectKey}`;

						if (utilsCheckExists(_saved[key])) {
							prepareRows[selectKey] = _saved[key];
						}
						iii++;
					}
				}
				ii++;
			}
			if (utilsCheckObjFilled(prepareRows)) {
				rows.push(prepareRows);
			}
			i++;
		}
		return rows;
	}

	async findAndCount(queryData = {}) {
		const output = await this.find(queryData);

		return [ output, output.length ];
	}

	async findOne(queryData = {}) {
		return (await this.find({ ...queryData, skip: 0, take: 1 }))[0];
	}

	async save(payloadData = {}) {
		const output = {};
		const payloadDataKeys = Object.keys(payloadData = this.columnsForSave(payloadData));
		let i = 0;

		while (i < payloadDataKeys.length) {
			this._index = this.setData([ `${this.id}|${payloadDataKeys[i]}` ], (output[payloadDataKeys[i]] = this[payloadDataKeys[i]] = (payloadData[payloadDataKeys[i]] ?? [])));
			i++;
		}
		return output;
	}

	async update(queryData = {}, payloadData = {}) {
		const entity = await this.findOne(queryData);
		const output = {};
		
		if (!entity) {
			throw new Error(`Entity with "${JSON.stringify(queryData)}" is not found.`);
		}
		if (!utilsCheckNumericInt(this._index)) {
			throw new Error(`Index "${this._index}" is not valid.`);
		}
		const payloadDataProcessed = this.columnsForSave(payloadData, [ 'newId' ]);

		if (utilsCheckStrIdExists(payloadDataProcessed['newId'])) {
			this.setData([ `${this.id}|id`, this._index ], (this.id = output['id'] = payloadDataProcessed['newId']));
		}
		delete payloadDataProcessed['newId'];
		delete payloadDataProcessed['id'];

		const payloadDataProcessedKeys = Object.keys(payloadDataProcessed);
		let i = 0;

		while (i < payloadDataProcessedKeys.length) {
			const key = payloadDataProcessedKeys[i];

			this.setData([ `${this.id}|${key}`, this._index ], (this[key] = output[key] = payloadData[key]));
			i++;
		}
		return output;
	}

	async delete(queryData = {}) {
		const entity = await this.findOne(queryData);
		
		if (!entity) {
			throw new Error(`Entity with "${JSON.stringify(queryData)}" is not found.`);
		}
		if (!utilsCheckNumericInt(this._index)) {
			throw new Error(`Index "${this._index}" is not valid.`);
		}
		const columns = this.columns();
		let i = 0;

		while (i < columns.length) {
			_saved = _saved[`${this.id}|${columns[i]}`].slice(this._index, this._index + 1); 
			i++;
		}
		return true;
	}
}
