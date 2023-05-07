
const typeForm = {
	parentName: 'countriesType',
	optionName: 'countriesTypeOption',
	optionListName: 'countriesTypeOptionList',
	optionFormName: 'countriesTypeOptionForm',
	statusName: 'countriesTypeStatus',
	statusListName: 'countriesTypeStatusList',
	relationListName: 'countriesTypeFormOptionList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Countries',

	pageUrl: 'types/:id',
	pageTitle: 'Type',

	id: 'countries-type-form',
	storeName: 'countries-type-form',
	apiUrl: 'type',

	entity: 'typeId', 
	entityRelation: 'typeOptionId',
	entityOptionRelation: 'typeTypeOptionId',
	relation: 'typeTypeOptions', 
	relationContent: 'typeTypeTypeOptions',

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

export default typeForm;
