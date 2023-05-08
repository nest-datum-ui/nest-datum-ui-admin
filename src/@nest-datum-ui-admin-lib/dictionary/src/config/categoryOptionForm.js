
const categoryOptionForm = {
	parentName: 'dictionaryCategoryOption',
	relationListName: 'dictionaryCategoryOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'categories/options/:id',
	pageTitle: 'Option',

	id: 'dictionary-category-options-form',
	storeName: 'dictionary-category-options-form',
	apiUrl: 'category-option',
	apiRelationUrl: 'category/option/:id',

	entity: 'categoryId', 
	entityRelation: 'categoryOptionId',
	entityOptionRelation: 'categoryCategoryOptionId',
	relation: 'categoryCategoryOptions', 
	relationContent: 'categoryCategoryCategoryOptions',

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

export default categoryOptionForm;
