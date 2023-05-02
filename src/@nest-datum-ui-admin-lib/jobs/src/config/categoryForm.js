
const categoryForm = {
	parentName: 'jobjCategory',
	optionName: 'jobjCategoryOption',
	optionListName: 'jobjCategoryOptionList',
	optionFormName: 'jobjCategoryOptionForm',
	statusName: 'jobjCategoryStatus',
	statusListName: 'jobjCategoryStatusList',
	relationListName: 'jobjCategoryFormRelationList',
	orderInHeaderTabMenu: 2,
	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Category',

	pageUrl: 'categories/:id',
	pageTitle: 'Category',

	id: 'jobj-categories-form',
	storeName: 'jobj-categories-form',
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
