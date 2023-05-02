import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireSort = async (key, newValue, search = window.location.search) => await (new Promise(async (resolve, reject) => {
	const sort = hookProperty('sort', search, true) || {};

	if (newValue.toLowerCase() === 'desc' || newValue.toLowerCase() === 'asc') {
		sort[key] = newValue;
	}
	else {
		delete sort[key];
	}
	const output = await fireUpdate('sort', sort);

	return setTimeout(() => resolve(output), 0);
}));
