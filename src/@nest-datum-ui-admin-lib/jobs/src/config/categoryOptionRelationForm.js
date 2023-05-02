import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const categoryOptionRelationForm = {
	id: 'jobs-category-option-relations-form',
	storeName: 'jobs-category-option-relations-form',
	apiUrl: 'category/:id/option',

	title: 'Category',
	orderInHeaderTabMenu: 2,
	post: {
		apiUrl: 'category/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'jobs-category-option-relations-form',
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
