import{ obj as utilsCheckObj } from '@nest-datum-utils/check';
import { storeDispatch } from '../../../Store.js';

export const fireListMerge = (storeName, data = {}) => async (callback = () => {}, prefix = 'api') => await storeDispatch(prefix, prefix +'.listMerge', {
	payload: {
		storeName,
		data,
		callback,
	},
})

export const reducerListMerge = (state, action) => {
	if (!utilsCheckObj(state.list[action.payload.storeName])) {
		state.list[action.payload.storeName] = {};
	}
	setTimeout(() => action.payload.callback(state, action), 0);

	return { 
		...state,
		list: {
			...state.list,
			[action.payload.storeName]: {
				...state.list[action.payload.storeName],
				...action.payload.data,
			},
		}, 
	};
};
