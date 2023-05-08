import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import Select from 'components/Select';

const postOptionRelationForm = {
	id: 'dictionary-post-option-relations-form',
	storeName: 'dictionary-post-option-relations-form',
	apiUrl: 'post/:id/option',

	title: 'Post',

	post: {
		apiUrl: 'post/:id/options',
	},

	fields: [{
		Component: Select,
		storeName: 'dictionary-post-option-relations-form',
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
