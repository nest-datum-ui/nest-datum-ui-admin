import { combineReducers } from 'redux';
import { ReduxEntity } from '@nest-datum-ui/redux';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';

export class ReduxReducerEntity extends ReduxEntity {
	setData(path = [], value) {
		return value;
	}

	delData(path = [], data, index) {
		return {};
	}

	async save(payloadData = {}) {
		if ((this.store 
			&& this.store.reducers
			&& !this.store.reducers[this.id])
			|| !this.store) {
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
			store.replaceReducer(combineReducers({ ...store.reducers }));
		}
		if (utilsCheckFunc(this._updater)) {
			this._updater();
		}
		return payloadData;
	}
}
