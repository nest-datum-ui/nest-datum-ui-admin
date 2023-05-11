import strFilled from '../str/filled.js';

const date = (value) => {
	if (!strFilled(value) && value.length !== 6) {
		return false;
	}
	return true;
};

export default date;
