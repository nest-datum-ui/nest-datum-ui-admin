
const typeOptionForm = {
	parentName: 'countriesTypeOption',
	relationListName: 'countriesTypeOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'types/options/:id',
	pageTitle: 'Option',

	id: 'countries-type-options-form',
	storeName: 'countries-type-options-form',
	apiUrl: 'type-option',
	apiRelationUrl: 'type/option/:id',
	orderInHeaderTabMenu: 2,
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

export default typeOptionForm;
