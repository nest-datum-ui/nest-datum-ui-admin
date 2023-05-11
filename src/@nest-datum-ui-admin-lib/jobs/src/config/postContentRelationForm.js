import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Store from '@nest-datum-ui/Store';
import Select from 'components/Select';

const postContentRelationForm = {
	id: 'jobs-post-content-relations-form',
	storeName: 'jobs-post-content-relations-form',
	apiUrl: 'post/content',

	title: 'Option',

	post: {
		apiUrl: 'post/content/:id',
	},

	fields: [{
		Component: Select,
		storeName: 'jobs-post-content-relations-form',
		apiUrl: 'post/option',
		name: 'id',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ 
			categoryCategoryOptions: { 
				categoryId: (Store()
					.getState()
					.api
					.form['jobs-post-form'] || {})['categoryId'], 
			}, 
		}),
		check: [ utilsCheckStrId ]
	}],
};

export default postContentRelationForm;
