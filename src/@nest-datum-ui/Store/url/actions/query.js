import { fireUpdate } from './update.js';
import hookProperty from '../hooks/hookProperty.js';

export const fireQuery = async (newQuery, search) => {
	const currentQuery = hookProperty('query', search || window.location.search) || '';

	if (newQuery !== currentQuery) {
		return await fireUpdate('query', ((newQuery || '').length > 0) ? newQuery : undefined, search);
	}
};
