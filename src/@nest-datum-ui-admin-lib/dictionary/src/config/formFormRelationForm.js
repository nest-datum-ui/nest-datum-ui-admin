import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const formFormRelationForm = {
	id: 'dictionary-form-option-relations-form',
	storeName: 'dictionary-form-option-relations-form',
	apiUrl: 'form/:id/option',

	title: 'Data type',

	post: {
		apiUrl: 'form/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'dictionary-form-option-relations-form',
		apiUrl: 'form',
		name: 'formId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default formFormRelationForm;
