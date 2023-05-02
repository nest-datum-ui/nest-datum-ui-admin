
const categoryStatusForm = {
	parentName: 'jobsCategoryStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'categories/statuses/:id',
	pageTitle: 'Status',

	id: 'jobs-category-statuses-form',
	storeName: 'jobs-category-statuses-form',
	apiUrl: 'category-status',

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

export default categoryStatusForm;
