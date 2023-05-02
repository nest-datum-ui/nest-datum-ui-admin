import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const postOptionRelationForm = {
	id: 'jobs-post-option-relations-form',
	storeName: 'jobs-post-option-relations-form',
	apiUrl: 'post/:id/option',

	title: 'Post',
	orderInHeaderTabMenu: 2,
	post: {
		apiUrl: 'post/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'jobs-post-option-relations-form',
		apiUrl: 'post',
		name: 'postId',
		itemKey: 'name',
		label: 'Select',
		required: true,
		filter: (index, storeName, entityId) => ({ custom: { disableForOption: entityId } }),
		check: [ utilsCheckStrId ]
	}],
};

export default postOptionRelationForm;
