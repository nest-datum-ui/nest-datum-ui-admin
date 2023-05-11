
const categoryStatusForm = {
	parentName: 'dictionaryCategoryStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'categories/statuses/:id',
	pageTitle: 'Status',

	id: 'dictionary-category-statuses-form',
	storeName: 'dictionary-category-statuses-form',
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
