import { 
	actionDialogOpen,
	actionApiFormRestore, 
} from '@nest-datum-ui/Store';

const accessOptionList = {
	parentName: 'dictionaryAccessOption',
	
	id: 'dictionary-accesses-options-list',
	storeName: 'dictionary-accesses-options-list',
	apiUrl: 'access-option',
	initialPage: 1,
	initialLimit: 20,
	search: true,
	bulkDeletion: true,
	withContextMenu: true,
	withFilter: true,

	entity: 'accessId', 
	entityOptionRelation: 'accessAccessOptionId',
	entityRelation: 'accessOptionId',
	relation: 'accessAccessOptions', 
	relationContent: 'accessAccessAccessOptions',

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
			text: 'Create',
			to: 'accesses/options/0',
			order: 3,
			variant: 'contained',
			color: 'secondary',
		},
	},
	filters: {
		isDeleted: true,
		isNotDeleted: true,
	},

	rowColumns: [{
		name: 'ID',
		id: 'id',
		sortable: true,
		order: 0,
	}, {
		name: 'Main',
		id: 'main',
		order: 1,
	}, {
		name: 'Data type',
		id: 'dictionary',
		order: 2,
	}, {
		name: 'Props',
		id: 'props',
		order: 3,
	}, {
		name: 'Story',
		id: 'createdAt',
		sortable: true,
		order: 5,
	}],
};

export default accessOptionList;
