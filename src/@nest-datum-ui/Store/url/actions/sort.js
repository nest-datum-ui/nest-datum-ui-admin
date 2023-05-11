import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireSort = async (key, newValue, search = window.location.search) => await (new Promise(async (resolve, reject) => {
	let sort = hookProperty('sort', search, true) || {};

	if (newValue && (newValue.toLowerCase() === 'desc' || newValue.toLowerCase() === 'asc')) {
		sort[key] = newValue;
	}
	else {
		if (sort) {
			delete sort[key];
		}
		else {
			sort = {};
		}
	}
	const output = await fireUpdate('sort', sort);

	return setTimeout(() => resolve(output), 0);
}));
