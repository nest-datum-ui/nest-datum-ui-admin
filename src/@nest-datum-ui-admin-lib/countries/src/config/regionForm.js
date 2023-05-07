
const regionForm = {
	parentName: 'countriesRegion',
	optionName: 'countriesRegionOption',
	optionListName: 'countriesRegionOptionList',
	optionFormName: 'countriesRegionOptionForm',
	statusName: 'countriesRegionStatus',
	statusListName: 'countriesRegionStatusList',
	relationListName: 'countriesRegionOptionRelationList',
	relationContentListName: 'countriesRegionContentRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Regions',

	pageUrl: 'regions/:id',
	pageTitle: 'Region',

	id: 'countries-region-form',
	storeName: 'countries-region-form',
	apiUrl: 'region',

	entity: 'regionId', 
	entityRelation: 'regionOptionId',
	entityOptionRelation: 'regionRegionOptionId',
	relation: 'regionRegionOptions', 
	relationContent: 'regionRegionRegionOptions',

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

export default regionForm;
