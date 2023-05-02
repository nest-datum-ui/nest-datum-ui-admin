
const typeStatusForm = {
	parentName: 'countriesTypeStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'types/statuses/:id',
	pageTitle: 'Status',
	orderInHeaderTabMenu: 2,
	id: 'countries-type-statuses-form',
	storeName: 'countries-type-statuses-form',
	apiUrl: 'type-status',

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

export default typeStatusForm;
