
const settingForm = {
	parentName: 'mailSetting',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Item',

	pageUrl: 'settings/:id',
	pageTitle: 'Setting',

	id: 'setting-form',
	storeName: 'setting-form',
	apiUrl: 'setting',
	orderInHeaderTabMenu: 2,
	
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
