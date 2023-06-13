import { ReduxEntity } from '@nest-datum-ui/redux';

export class ReduxModelEntity extends ReduxEntity {
	async setData(path = [], value, index, data) {
		return await this.dispatch([ 'set', ...path ], value, index, data);
	}

	async delData(path = [], index, data) {
		return await this.dispatch([ 'del', ...path ], index, data);
	}

	async getData(path = [], index, data) {
		return await this.dispatch([ 'get', ...path ], index, data);
	}
}
