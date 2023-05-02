import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const regionFormRelationForm = {
	id: 'countries-region-option-relations-form',
	storeName: 'countries-region-option-relations-form',
	apiUrl: 'region/:id/option',

	title: 'Regions',
	orderInHeaderTabMenu: 2,
	post: {
		apiUrl: 'region/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'countries-region-option-relations-form',
		apiUrl: 'region',
		name: 'regionId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default regionFormRelationForm;
