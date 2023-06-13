
const arrToObj = (data = [], column) => {
	const output = {};

	data.forEach((item) => {
		output[item[column]] = item;
	});
	return output;
};

export default arrToObj;
