import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const categoryOptionRelationForm = {
	id: 'dictionary-category-option-relations-form',
	storeName: 'dictionary-category-option-relations-form',
	apiUrl: 'category/:id/option',

	title: 'Category',

	post: {
		apiUrl: 'category/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'dictionary-category-option-relations-form',
		apiUrl: 'category',
		name: 'categoryId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default categoryOptionRelationForm;
