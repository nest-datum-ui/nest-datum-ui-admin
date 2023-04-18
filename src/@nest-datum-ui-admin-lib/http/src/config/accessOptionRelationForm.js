import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const accessOptionRelationForm = {
	id: 'http-accesses-option-relations-form',
	storeName: 'http-accesses-option-relations-form',
	apiUrl: 'access/:id/option',

	title: 'Access',

	post: {
		apiUrl: 'access/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'http-accesses-option-relations-form',
		apiUrl: 'access',
		name: 'accessId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default accessOptionRelationForm;
