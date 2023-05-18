
const tagOptionForm = {
	parentName: 'jobsTagOption',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'tags/options/:id',
	pageTitle: 'Option',

	id: 'jobs-tag-options-form',
	storeName: 'jobs-tag-options-form',
	apiUrl: 'tag-option',
	orderInHeaderTabMenu: 2,

	relations: {
		apiUrl: 'tag/:id/options',
	},

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

export default tagOptionForm;
