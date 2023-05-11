import str from './index.js';

const obj = (value) => str(value)
	&& value.indexOf('{"') === 0
	&& value[value.length - 1] === '}';

export default obj;
