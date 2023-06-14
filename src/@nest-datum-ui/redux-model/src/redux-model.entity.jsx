import { ReduxEntity } from '@nest-datum-ui/redux';

export class ReduxModelEntity extends ReduxEntity {
	setData(path = [], value, index, data) {
		this.dispatch([ 'set', ...path ], value, index, data);

		return data;
	}

	delData(path = [], index, data) {
		return {};
	}

	getData(path = [], index, data) {
		return {};
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
}
