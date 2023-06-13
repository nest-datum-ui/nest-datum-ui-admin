import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { Entity } from '@nest-datum-ui/entity';

const defaultReducer = (state = {}, action) => {
	return state;
};

export class ReduxEntity extends Entity {
	store = undefined;
	reducers = undefined;

	middleware(store) {
		return (next) => (action) => next(action);
	}

	async dispatch(path, value, index, data) {
		if (!this.store) {
			await (new Promise((resolve) => setTimeout(() => resolve(), 1000)));

			if (!this.store) {
				return await this.dispatch(path, value, index, data);
			}
		}
		return await this.store.dispatch({
			type: path.shift(),
			payload: {
				path, 
				value, 
				index, 
				data,
			},
		});
	}

	async save(payloadData = {}) {
		payloadData = { 
			...payloadData, 
			reducers: { 
				...((payloadData || {}).reducers || {}),  
				default: defaultReducer,
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

		return await super.save({ ...payloadData, store: (this.store = store), reducers: reducersProcessed });
	}
}
