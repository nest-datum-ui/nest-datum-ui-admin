
const postStatusForm = {
	parentName: 'jobsPostStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'posts/statuses/:id',
	pageTitle: 'Status',
	orderInHeaderTabMenu: 2,
	id: 'jobs-post-statuses-form',
	storeName: 'jobs-post-statuses-form',
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
