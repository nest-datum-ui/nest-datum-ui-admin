
const reportForm = {
	parentName: 'lensaReport',
	statusName: 'lensaReportStatus',
	statusListName: 'lensaReportStatusList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'report',

	pageUrl: 'reports/:id',
	pageTitle: 'Report',

	id: 'lensa-report-form',
	storeName: 'lensa-report-form',
	apiUrl: 'report',
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

export default reportForm;
