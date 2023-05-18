
const fieldStatusForm = {
	parentName: 'dictionaryFieldStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'fields/statuses/:id',
	pageTitle: 'Status',
	orderInHeaderTabMenu: 2,
	id: 'dictionary-field-statuses-form',
	storeName: 'dictionary-field-statuses-form',
	apiUrl: 'field-status',

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

export default fieldStatusForm;
