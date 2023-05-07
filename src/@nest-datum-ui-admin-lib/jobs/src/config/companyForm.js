
const companyForm = {
	parentName: 'jobsCompany',
	optionName: 'jobsCompanyOption',
	optionListName: 'jobsCompanyOptionList',
	optionFormName: 'jobsCompanyOptionForm',
	statusName: 'jobsCompanyStatus',
	statusListName: 'jobsCompanyStatusList',
	relationListName: 'jobsCompanyFormOptionList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'jobs',

	pageUrl: 'companies/:id',
	pageTitle: 'Company',

	id: 'jobs-company-form',
	storeName: 'jobs-company-form',
	apiUrl: 'company',

	entity: 'companyId', 
	entityRelation: 'companyOptionId',
	entityOptionRelation: 'companyCompanyOptionId',
	relation: 'companyCompanyOptions', 
	relationContent: 'companyCompanyCompanyOptions',

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

export default companyForm;
