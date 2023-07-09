import { combineReducers } from 'redux';
import { ReduxEntity } from '@nest-datum-ui/redux';

export class ReduxModelEntity extends ReduxEntity {
	setData(path = [], value) {
		return value;
	}

	delData(path = [], data, index) {
		return {};
	}

	async save(payloadData = {}) {
		const reduxEntity = (await this.find({ 
			select: {
				store: true,
			}, 
			where: { 
				name: 'ReduxEntity',
			}, 
		}))[0];
		const store = reduxEntity.store;
		const reducers = store.reducers;

		store.reducers = {
			...reducers,
			[this.id]: this.defaultReducer.bind(this),
		};
		store.replaceReducer(combineReducers(store.reducers));

		return this.setData([ this.id ], this.columnsForSave(payloadData));
	}
}
