
const categoryForm = {
	parentName: 'dictionaryCategory',
	optionName: 'dictionaryCategoryOption',
	optionListName: 'dictionaryCategoryOptionList',
	optionFormName: 'dictionaryCategoryOptionForm',
	statusName: 'dictionaryCategoryStatus',
	statusListName: 'dictionaryCategoryStatusList',
	relationListName: 'dictionaryCategoryFormOptionList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Dictionary',

	pageUrl: 'categories/:id',
	pageTitle: 'Category',

	id: 'dictionary-category-form',
	storeName: 'dictionary-category-form',
	apiUrl: 'category',

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

export default categoryForm;
