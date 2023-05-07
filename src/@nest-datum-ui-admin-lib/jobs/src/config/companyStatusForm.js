
const companyStatusForm = {
	parentName: 'jobsCompanyStatus',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Status',

	pageUrl: 'companies/statuses/:id',
	pageTitle: 'Status',

	id: 'jobs-company-statuses-form',
	storeName: 'jobs-company-statuses-form',
	apiUrl: 'company-status',

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

export default companyStatusForm;
