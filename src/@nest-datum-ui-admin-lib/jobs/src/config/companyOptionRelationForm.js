import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const companyOptionRelationForm = {
	id: 'jobs-company-option-relations-form',
	storeName: 'jobs-company-option-relations-form',
	apiUrl: 'company/:id/option',

	title: 'Company',

	post: {
		apiUrl: 'company/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'jobs-company-option-relations-form',
		apiUrl: 'company',
		name: 'companyId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default companyOptionRelationForm;
