import React from 'react';
import { 
	actionDialogOpen,
	actionApiFormRestore, 
} from '@nest-datum-ui/Store';
import TypographyTable from 'components/Typography/Table';
import FormsTypographyOptionValue from '../components/Typography/Option/Value';

const postContentRelationList = {
	title: 'Values',
	subtitle: 'Intermediate data between the main model and current option.',
	formName: 'jobsPostContentRelationForm',

	id: 'jobs-post-content-relations-list',
	storeName: 'jobs-post-content-relations-list',
	columnName: 'postOptionId',
	apiMainModelUrl: `${process.env.URL_API_JOBS}/post`,
	apiUrl: 'post/content',
	initialPage: 1,
	initialLimit: 20,
	bulkDeletion: true,
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
		wrapper: (item, { id }) => <TypographyTable 
			onClick={() => actionDialogOpen('relation', { postContentId: id })()} 
			sx={{ 
				cursor: 'pointer', 
			}}>
			{String(id)}
		</TypographyTable>,
	}, {
		name: 'Type option',
		id: 'postOptionId',
		order: 1,
	}, {
		name: 'Value',
		id: 'value',
		order: 2,
		wrapper: (item, { postOptionId, value }) => <FormsTypographyOptionValue 
			postOptionId={postOptionId}
			value={value} />
	}, {
		name: 'Story',
		id: 'createdAt',
		order: 3,
	}],
};

export default postContentRelationList;
