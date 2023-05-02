import { 
	str as utilsCheckStr,
	objFilled as utilsCheckObjFilled, 
} from '@nest-datum-utils/check';
import { hookNavigate } from '../hooks';
import hookProperty from '../hooks/hookProperty.js';

export const fireFilterClear = async (columnName) => await (new Promise(async (resolve, reject) => {
	let query = hookProperty('query', window.location.search) || '',
		sort = hookProperty('sort', window.location.search, true),
		url = '';

	if (utilsCheckStr(columnName)) {
		let filter = hookProperty('filter', window.location.search, true) || {};

		delete filter[columnName];

		if (utilsCheckObjFilled(filter)) {
			url += `?filter=${JSON.stringify(filter)}`;
		}
		if (utilsCheckStr(query) && query.length > 0) {
			url += `${url ? '&' : '?'}query=${query}`;
		}
		if (utilsCheckObjFilled(sort)) {
			url += `${url ? '&' : '?'}sort=${JSON.stringify(sort)}`;
		}
	}
	else {
		const searchInputNode = document.getElementById('form-search');

		if (searchInputNode) {
			searchInputNode.value = '';
		}
	}
	url = window.location.pathname + url;

	if (url !== window.location.href) {
		await hookNavigate(url);

		return setTimeout(() => resolve(true), 0);
	}
	return setTimeout(() => resolve(false), 0);
}));
