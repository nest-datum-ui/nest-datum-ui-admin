
const companyOptionForm = {
	parentName: 'jobsCompanyOption',
	relationListName: 'jobsCompanyOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'companies/options/:id',
	pageTitle: 'Option',

	id: 'jobs-company-options-form',
	storeName: 'jobs-company-options-form',
	apiUrl: 'company-option',
	apiRelationUrl: 'company/option/:id',

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

export default companyOptionForm;
