
const postOptionForm = {
	parentName: 'jobsPostOption',
	relationListName: 'jobsPostOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'posts/options/:id',
	pageTitle: 'Option',

	id: 'jobs-post-options-form',
	storeName: 'jobs-post-options-form',
	apiUrl: 'post-option',
	apiRelationUrl: 'post/option/:id',

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

export default postOptionForm;
