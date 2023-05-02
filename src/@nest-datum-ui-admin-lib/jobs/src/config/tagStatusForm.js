
const tagStatusForm = {
	parentName: 'jobsTagStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'tags/statuses/:id',
	pageTitle: 'Status',

	id: 'jobs-tag-statuses-form',
	storeName: 'jobs-tag-statuses-form',
	apiUrl: 'tag-status',
	orderInHeaderTabMenu: 2,
	
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

export default tagStatusForm;
