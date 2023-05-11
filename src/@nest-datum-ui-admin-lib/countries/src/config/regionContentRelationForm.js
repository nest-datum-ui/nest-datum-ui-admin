import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Store from '@nest-datum-ui/Store';
import Select from 'components/Select';

const regionContentRelationForm = {
	id: 'countries-region-content-relations-form',
	storeName: 'countries-region-content-relations-form',
	apiUrl: 'region/content',

	title: 'Option',

	post: {
		apiUrl: 'region/content/:id',
	},

	fields: [{
		Component: Select,
		storeName: 'countries-region-content-relations-form',
		apiUrl: 'type/option',
		name: 'id',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ 
			typeTypeOptions: { 
				typeId: (Store()
					.getState()
					.api
					.form['countries-region-form'] || {})['typeId'], 
			}, 
		}),
		check: [ utilsCheckStrId ]
	}],
};

export default regionContentRelationForm;
