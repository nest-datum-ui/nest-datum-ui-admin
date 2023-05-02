
const formStatusForm = {
	parentName: 'dictionaryFormStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'dictionary/statuses/:id',
	pageTitle: 'Status',

	id: 'dictionary-form-statuses-form',
	storeName: 'dictionary-form-statuses-form',
	apiUrl: 'form-status',

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

export default formStatusForm;
