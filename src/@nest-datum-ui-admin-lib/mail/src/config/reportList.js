import { actionDialogOpen } from '@nest-datum-ui/Store';

const reportList = {
	parentName: 'mailReport',
	
	id: 'mail-report-list',
	storeName: 'mail-report-list',
	apiUrl: 'report',
	initialPage: 1,
	initialLimit: 20,
	bulkDeletion: true,
	search: true,
	withContextMenu: true,
	withFilter: true,

	manage: {
		dropPermanently: {
			text: (index, selected, selectedForDrop, selectedForDropPermanently) => `Delete checked (${selectedForDrop.length})`,
			showStrategy: (selected, selectedForDrop, selectedForDropPermanently) => selectedForDrop.length > 0,
			onClick: (e, index, selected, selectedForDrop, selectedForDropPermanently) => actionDialogOpen('drop-many', { ids: selectedForDrop })(),
			order: 1,
			variant: 'contained',
			color: 'error',
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
		width: 25,
	}, {
		name: 'Main',
		id: 'main',
		order: 1,
		width: 41,
	}, {
		name: 'Status',
		id: 'status',
		order: 2,
		width: 16,
	}, {
		name: 'Story',
		id: 'createdAt',
		sortable: true,
		order: 3,
		width: 16,
	}],
};

export default reportList;
