import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const formRelationForm = {
	id: 'files-provider-option-relations-form',
	storeName: 'files-provider-option-relations-form',
	apiUrl: 'type/:id/option',

	title: 'Data type',
	orderInHeaderTabMenu: 2,
	post: {
		apiUrl: 'type/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'files-provider-option-relations-form',
		apiUrl: 'type',
		name: 'typeId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default formRelationForm;
