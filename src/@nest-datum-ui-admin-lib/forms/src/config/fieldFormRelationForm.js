import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const fieldFormRelationForm = {
	id: 'forms-field-form-relations-form',
	storeName: 'forms-field-form-relations-form',
	apiUrl: 'form/field/:id',

	title: 'Field',

	post: {
		apiUrl: 'form/field/:id',
	},

	fields: [{
		Component: Select,
		storeName: 'forms-field-form-relations-form',
		apiUrl: 'field',
		name: 'fieldId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default fieldFormRelationForm;
