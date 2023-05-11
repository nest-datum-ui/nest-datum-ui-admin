import { 
	actionDialogOpen,
	actionApiFormRestore, 
} from '@nest-datum-ui/Store';

const categoryOptionRelationList = {
	title: 'Dictionary',
	subtitle: 'List of dictionary items that own the current setting.',
	formName: 'dictionaryCategoryOptionRelationForm',
	orderInHeaderTabMenu: 2,
	id: 'dictionary-category-option-relations-list',
	storeName: 'dictionary-category-option-relations-list',
	columnName: 'categoryId',
	apiMainModelUrl: `${process.env.URL_API_DICTIONARY}/category`,
	apiUrl: 'category/option',
	initialPage: 1,
	initialLimit: 9999,
	withForceDropMenu: true,

	listTitle: 'Related data',
	listSubtitle: 'Intermediate data between the main model and current option.',

	manage: {
		drop: {
			text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Disable checked (${selectedForDrop.length})`,
			showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDrop.length > 0,
			onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('disable-many', { ids: selectedForDrop })(),
			order: 0,
			variant: 'contained',
			color: 'error',
		},
		dropPermanently: {
			text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selectedForDropPermanently.length})`,
			showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
			onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selectedForDropPermanently })(),
			order: 1,
			variant: 'contained',
			color: 'error',
		},
		restore: {
			text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Restore (${selectedForDropPermanently.length})`,
			showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDropPermanently.length > 0,
			onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently, context) => actionApiFormRestore(context.storeName, { apiUrl: context.apiFullUrl, ids: selectedForDropPermanently })(),
			order: 2,
			variant: 'contained',
			color: 'primary',
		},
		create: {
			text: 'Add relation',
			order: 3,
			variant: 'contained',
			color: 'secondary',
			onClick: () => actionDialogOpen('relation')(),
		},
	},
	rowColumns: [{
		name: 'ID',
		id: 'id',
		order: 0,
	}, {
		name: 'Category',
		id: 'categoryId',
		order: 1,
	}, {
		name: 'Story',
		id: 'createdAt',
		order: 2,
	}],
};

export default categoryOptionRelationList;
