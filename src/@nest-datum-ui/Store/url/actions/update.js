import { 
	obj as utilsCheckObj,
	arr as utilsCheckArr, 
} from '@nest-datum-utils/check';
import { hookNavigate } from '../hooks';

export const fireUpdate = async (key, value, search = window.location.search) => await (new Promise(async (resolve, reject) => {
	const searchSplit = search
		.split('?')
		.slice(1)
		.join('?')
		.split('&')
		.filter((item) => item && item);
	const itemIndex = searchSplit.findIndex((item) => item.indexOf(`${key}=`) === 0);
	const valueProcessed = (utilsCheckObj(value) || utilsCheckArr(value))
		? (Object.keys(value).length > 0
			? JSON.stringify(value)
			: undefined)
		: value;

	if (itemIndex >= 0) {
		if (valueProcessed === undefined) {
			searchSplit.splice(itemIndex, 1);
		}
		else {
			searchSplit[itemIndex] = `${key}=${valueProcessed}`;
		}
	}
	else {
		searchSplit.push(`${key}=${valueProcessed}`);
	}
	const output = await hookNavigate(`${window.location.pathname}?${searchSplit.join('&')}`);

	return setTimeout(() => resolve(output), 0);
}));
