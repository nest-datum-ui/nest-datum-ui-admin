import {
	createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { Entity } from '@nest-datum-ui/entity';
import {
	func as utilsCheckFunc,
	arrFilled as utilsCheckArrFilled,
	objFilled as utilsCheckObjFilled,
} from '@nest-datum-utils/check';

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
				[this.id]: (...properties) => (this.defaultReducer.bind(this))(...properties),
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

	defaultReducer (state = {}, action) {
		let type = (action || {}).type,
			payload = (action || {}).payload || {},
			path = (payload || {}).path,
			value = (payload || {}).value,
			index = (payload || {}).index,
			data = (payload || {}).data;

		if ((utilsCheckObjFilled(value) 
			&& utilsCheckFunc(value['@@observable']))) {
			value = undefined;
		}
		if (type.indexOf('@@redux/') === 0
			|| (utilsCheckArrFilled(path)
				&& (path[path.length - 1].includes('|store')
					|| path[path.length - 1].includes('|reducers')))) {
			return { ...state };
		}
		if (!utilsCheckObjFilled(state[this.id])) {
			state[this.id] = {
				id: this.id,
			};
		}
		return utilsCheckFunc(this[`${type}Reducer`])
			? this[`${type}Reducer`](state, path, value, index, data)
			: ({ ...state });
	}

	getReducer(state = {}, path, value, index, data) {
		return { ...state };
	}

	delReducer(state = {}, path, value, index, data) {
		return { ...state };
	}

	setReducer(state = {}, path, value, index, data) {
		return { ...state };
	}
}
