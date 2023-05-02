
const formOptionForm = {
	parentName: 'dictionaryFormOption',
	relationListName: 'dictionaryFormOptionRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Option',

	pageUrl: 'dictionary/options/:id',
	pageTitle: 'Option',

	id: 'dictionary-form-options-form',
	storeName: 'dictionary-form-options-form',
	apiUrl: 'form-option',
	apiRelationUrl: 'form/option/:id',

	entity: 'formId', 
	entityRelation: 'formOptionId',
	entityOptionRelation: 'formFormOptionId',
	relation: 'formFormOptions', 
	relationContent: 'formFormFormOptions',

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

export default formOptionForm;
