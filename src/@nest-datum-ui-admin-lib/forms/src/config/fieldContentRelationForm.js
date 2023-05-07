import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Store from '@nest-datum-ui/Store';
import Select from 'components/Select';

const fieldContentRelationForm = {
	id: 'forms-field-content-relations-form',
	storeName: 'forms-field-content-relations-form',
	apiUrl: 'field/content/:id',

	title: 'Field',

	post: {
		apiUrl: 'field/content/:id',
	},

	fields: [{
		Component: Select,
		storeName: 'forms-field-content-relations-form',
		apiUrl: 'field',
		name: 'fieldId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ 
			formFields: { 
				formId: (Store()
					.getState()
					.api
					.form['forms-content-form'] || {})['formId'], 
			}, 
		}),
		check: [ utilsCheckStrId ]
	}],
};

export default fieldContentRelationForm;
