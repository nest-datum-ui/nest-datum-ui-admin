
const formForm = {
	parentName: 'dictionaryForm',
	optionName: 'dictionaryFormOption',
	optionListName: 'dictionaryFormOptionList',
	optionFormName: 'dictionaryFormOptionForm',
	statusName: 'dictionaryFormStatus',
	statusListName: 'dictionaryFormStatusList',
	relationListName: 'dictionaryFormFormRelationList',

	displayInBreadcrumbsMenu: true,
	breadcrumbsMenuTitle: 'Form',

	pageUrl: 'dictionary/:id',
	pageTitle: 'Form',

	id: 'dictionary-form-form',
	storeName: 'dictionary-form-form',
	apiUrl: 'form',

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

export default formForm;
