
const postForm = {
	parentName: 'jobsPost',
	optionName: 'jobsPostOption',
	optionListName: 'jobsPostOptionList',
	optionFormName: 'jobsPostOptionForm',
	statusName: 'jobsPostStatus',
	statusListName: 'jobsPostStatusList',
	relationListName: 'jobsPostOptionRelationList',
	relationContentListName: 'jobsPostContentRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Posts',
	orderInHeaderTabMenu: 2,
	pageUrl: 'posts/:id',
	pageTitle: 'Post',

	id: 'jobs-post-form',
	storeName: 'jobs-post-form',
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
