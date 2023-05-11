
const postForm = {
	parentName: 'dictionaryPost',
	optionName: 'dictionaryPostOption',
	optionListName: 'dictionaryPostOptionList',
	optionFormName: 'dictionaryPostOptionForm',
	statusName: 'dictionaryPostStatus',
	statusListName: 'dictionaryPostStatusList',
	relationListName: 'dictionaryPostOptionRelationList',
	relationContentListName: 'dictionaryPostContentRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Posts',

	pageUrl: 'posts/:id',
	pageTitle: 'Post',

	id: 'dictionary-post-form',
	storeName: 'dictionary-post-form',
	apiUrl: 'post',

	entity: 'postId', 
	entityRelation: 'postOptionId',
	entityOptionRelation: 'postPostOptionId',
	relation: 'postPostOptions', 
	relationContent: 'postPostPostOptions',

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

export default postForm;
