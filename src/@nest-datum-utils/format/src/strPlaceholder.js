
const strPlaceholder = (sourceStr = '', properties = {}, divider = '/') => {
	const sourceStrSplit = sourceStr.split(divider);
	let i = 0,
		output = [];

	while (i < sourceStrSplit.length) {
		if (sourceStrSplit[i][0] === ':') {
			const key = sourceStrSplit[i].replace(':', '');

			if (properties[key]) {
				sourceStrSplit[i] = properties[key];
			}
		}
		output.push(sourceStrSplit[i]);
		i++;
	}
	return output.join(divider);
};

export default strPlaceholder;