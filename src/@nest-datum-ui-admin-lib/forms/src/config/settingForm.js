
const settingForm = {
	parentName: 'formsSetting',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Item',

	pageUrl: 'settings/:id',
	pageTitle: 'Setting',
	orderInHeaderTabMenu: 2,
	id: 'setting-form',
	storeName: 'setting-form',
	apiUrl: 'setting',

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

export default settingForm;
