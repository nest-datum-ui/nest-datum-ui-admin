import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const typeFormRelationForm = {
	id: 'countries-type-option-relations-form',
	storeName: 'countries-type-option-relations-form',
	apiUrl: 'type/:id/option',

	title: 'Types',
	orderInHeaderTabMenu: 2,
	post: {
		apiUrl: 'type/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'countries-type-option-relations-form',
		apiUrl: 'type',
		name: 'typeId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default typeFormRelationForm;
