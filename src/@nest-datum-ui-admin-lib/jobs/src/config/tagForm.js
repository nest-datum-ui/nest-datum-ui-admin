
const tagForm = {
	parentName: 'jobsTag',
	optionName: 'jobsTagOption',
	optionListName: 'jobsTagOptionList',
	optionFormName: 'jobsTagOptionForm',
	statusName: 'jobsTagStatus',
	statusListName: 'jobsTagStatusList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Tag',
	orderInHeaderTabMenu: 2,
	pageUrl: 'tags/:id',
	pageTitle: 'Tag',

	id: 'jobs-tag-form',
	storeName: 'jobs-tag-form',
	apiUrl: 'tag',

	entity: 'tagId', 
	entityRelation: 'tagOptionId',
	entityOptionRelation: 'tagTagOptionId',
	relation: 'tagTagOptions', 
	relationContent: 'tagTagTagOptions',

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

export default tagForm;
