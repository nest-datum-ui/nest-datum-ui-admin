
const regionStatusForm = {
	parentName: 'countriesRegionStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'regions/statuses/:id',
	pageTitle: 'Status',

	id: 'countries-region-statuses-form',
	storeName: 'countries-region-statuses-form',
	apiUrl: 'region-status',

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

export default regionStatusForm;
