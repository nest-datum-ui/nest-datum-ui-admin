import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireFilter = async (key, value, options = {}, search) => await (new Promise(async (resolve, reject) => {
	const valueProcessed = value ? (((options['type'] || {})['name'] === 'Boolean')
		? Number(value)
		: value) : undefined;
	let filter = hookProperty('filter', search || window.location.search, true) || {};

	if (valueProcessed === undefined) {
		if (filter) {
			delete filter[key];
		}
		else {
			filter = {};
		}
	}
	else {
		filter[key] = valueProcessed;
	}
	const output = await fireUpdate('filter', filter);

	return setTimeout(() => resolve(output), 0);
}));
