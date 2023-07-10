import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { Entity } from '@nest-datum-ui/entity';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';

export class ReduxEntity extends Entity {
	store = undefined;
	reducers = undefined;

	columnsInstance() {
		const columns = super.columnsInstance();
		const columnsKeys = Object.keys(columns);
		const output = {};
		let i = 0;

		while (i < columnsKeys.length) {
			if (columnsKeys[i] !== 'reducers'
				&& columnsKeys[i] !== 'store') {
				output[columnsKeys[i]] = columns[columnsKeys[i]];
			}
			i++;
		}
		return output;
	}

	middleware(store) {
		return (next) => (action) => {
			return next(action);
		};
	}

	async save(payloadData = {}) {
		payloadData = { 
			...this.columnsInstance(),
			...payloadData, 
			reducers: { 
				...((payloadData || {}).reducers || {}),  
				[this.id]: this.defaultReducer.bind(this),
			}, 
		};
		let i = 0,
			reducersKeys = Object.keys(payloadData['reducers']),
			reducersProcessed = {};

		while (i < reducersKeys.length) {
			reducersProcessed[reducersKeys[i]] = await payloadData['reducers'][reducersKeys[i]];
			i++;
		}
		const store = await createStore(combineReducers(reducersProcessed), undefined, applyMiddleware(thunk, this.middleware));

		store.reducers = reducersProcessed;
		
		if (utilsCheckFunc(this._updater)) {
			this._updater();
		}
		return await super.save({ ...payloadData, store: (this.store = store), reducers: reducersProcessed });
	}

	async dispatch({ type, path, value, instance }) {
		if (!this.store) {
			await (new Promise((resolve) => setTimeout(() => resolve(), 100)));

			if (!this.store) {
				return await this.dispatch({ type, path, value, instance });
			}
		}
		return await this.store.dispatch({ 
			type, 
			payload: { 
				path, 
				valuePrevious: value,
				valueProcessed: await (instance().controllerInstance())[type]({ path, value }), 
			}, 
		});
	}

	defaultReducer(state = {}, action) {
		return this.columnsInstance();
	}
}
