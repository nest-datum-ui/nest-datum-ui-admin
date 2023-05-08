
const postStatusForm = {
	parentName: 'dictionaryPostStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'posts/statuses/:id',
	pageTitle: 'Status',

	id: 'dictionary-post-statuses-form',
	storeName: 'dictionary-post-statuses-form',
	apiUrl: 'post-status',

	manage: {
		create: {
			text: 'Save',
			order: 0,
		},
		dropOnRemovable: {
			text: 'Disable',
			order: 1,
		},
	},
};

export default postStatusForm;
