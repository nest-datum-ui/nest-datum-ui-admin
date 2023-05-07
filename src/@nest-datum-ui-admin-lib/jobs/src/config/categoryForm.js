
const categoryForm = {
	parentName: 'jobsCategory',
	optionName: 'jobsCategoryOption',
	optionListName: 'jobsCategoryOptionList',
	optionFormName: 'jobsCategoryOptionForm',
	statusName: 'jobsCategoryStatus',
	statusListName: 'jobsCategoryStatusList',
	relationListName: 'jobsCategoryFormOptionList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'jobs',

	pageUrl: 'categories/:id',
	pageTitle: 'Category',

	id: 'jobs-category-form',
	storeName: 'jobs-category-form',
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
