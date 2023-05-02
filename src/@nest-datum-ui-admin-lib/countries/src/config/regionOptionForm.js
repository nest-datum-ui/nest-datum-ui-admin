
const regionOptionForm = {
	parentName: 'countriesRegionOption',
	relationListName: 'countriesRegionOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'regions/options/:id',
	pageTitle: 'Option',

	id: 'countries-region-options-form',
	storeName: 'countries-region-options-form',
	apiUrl: 'region-option',
	apiRelationUrl: 'region/option/:id',

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

export default regionOptionForm;
