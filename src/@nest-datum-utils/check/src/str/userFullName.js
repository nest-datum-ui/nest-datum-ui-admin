import userName from './userName.js';
import filled from './filled.js';

const userFullName = (value) => {
	if (!filled(value)) {
		return false;
	}
	const valueSplit = value.split(' ');

	if (valueSplit.length < 2 || valueSplit.length > 7) {
		return false;
	}
	const isError = valueSplit.find((item) => !userName(item));

	if (isError) {
		return false;
	}
	return true;
};

export default userFullName;
