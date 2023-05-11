import React from 'react';
import PropTypes from 'prop-types';
import { 
	ContextService,
	ContextProps,
	ContextRoute, 
} from '@nest-datum-ui/Context';
import Store, { 
	actionApiListProp,
	actionApiFormRestore,
	actionApiFormProp,
	actionDialogOpen,
	actionBreadcrumbsPush,
	actionUrlFilter,
} from '@nest-datum-ui/Store';
import { func as utilsCheckFunc } from '@nest-datum-utils/check';
import TypographyTable from 'components/Typography/Table';
import TypographyFetch from '@nest-datum-ui/Typography/Fetch';
import StyledWrapper from './Styled/Wrapper.jsx';
import FolderIcon from '@mui/icons-material/Folder';
import FilesPaperPreview from '@nest-datum-ui-admin-lib/files/src/components/Paper/Preview'

let Row = ({
	querySource,
	id,
	parentId,
	path,
	name,
	description,
	type,
	size,
	userId,
	isDeleted,
	isNotDelete,
	createdAt,
	updatedAt,
	disableLink,
	onCheck,
	onFile,
	onFolder,
	withContextMenu,
	bulkDeletion,
}) => {
	const serviceName = React.useContext(ContextService);
	const routeName = React.useContext(ContextRoute);
	const { 
		[serviceName]: {
			[routeName]: { 
				storeName,
				files: {
					apiFullUrl: filesApiUrl,
				},
			}, 
			filesSystemList: {
				storeName: filesSystemListStoreName,
			},
		},
		sso: {
			ssoUserList: {
				apiFullUrl: ssoUserListApiUrl,
			},
		},
	} = React.useContext(ContextProps);
	const onDrop = React.useCallback((e) => actionDialogOpen(`fileManager${isDeleted ? 'Drop' : 'Disable'}`, { entityId: id, type })(), [
		id,
		isDeleted,
		type,
	]);
	const onDropForce = React.useCallback((e) => actionDialogOpen(`fileManagerDropForce`, { entityId: id, type })(), [
		id,
		type,
	]);
	const onRestore = React.useCallback((e) => actionApiFormRestore(storeName, { apiUrl: filesApiUrl, entityId: id, type: 'list' })(), [
		storeName,
		filesApiUrl,
		id,
	]);
	const onEdit = React.useCallback((e) => actionApiFormProp(storeName, 'loader', true)(() => actionDialogOpen((type === 'folder') ? 'folderManagerForm' : 'fileManagerForm', { entityId: id, type })()), [
		storeName,
		id,
		type,
	]);
	const onFolderWrapper = React.useCallback((e) => actionApiListProp(storeName, 'loader', true)(() => {
		if (querySource === 'url') {
			actionUrlFilter('parentId', id);
		}
		else {
			actionApiListProp(filesSystemListStoreName, 'parentId',id)(() => {
				const currentFilter = (Store()
					.getState()
					.api
					.list[storeName] || {})
					.filter || {};
				
				actionApiListProp(storeName, 'filter', { ...currentFilter, parentId: id })();
			});
		}
		actionBreadcrumbsPush(storeName, { key: id, text: name })();
		onFolder(e, { id, name });
	}), [
		storeName,
		filesSystemListStoreName,
		name,
		id,
		querySource,
		onFolder,
	]);
	const onFileWrapper = React.useCallback((e) => {
		if (utilsCheckFunc(onFile)) {
			onFile(e, { id, name });
		}
	}, [
		onFile,
		id,
		name,
	]);

	let ifImg = { id, src: path }
	return <StyledWrapper 
		id={id} 
		isDeleted={isDeleted} 
		isNotDelete={isNotDelete} 
		createdAt={createdAt} 
		updatedAt={updatedAt}
		onDrop={onDrop}
		onDropForce={onDropForce}
		onRestore={onRestore}
		onEdit={onEdit}
		onCheck={onCheck}
		withContextMenu={withContextMenu}
		bulkDeletion={bulkDeletion}>
		{([{ 
			children: <TypographyTable 
				key={0} 
				isDeleted={isDeleted}
				{ ...(type === 'folder')
					? { onClick: onFolderWrapper, style: { cursor: 'pointer' } }
					: (utilsCheckFunc(onFile)
						? { onClick: onFileWrapper, style: { cursor: 'pointer' } }
						: {}) }>
				{id}
			</TypographyTable>, 
		}, { 
			children: <React.Fragment key={1}>
				<TypographyTable 
					{ ...(type === 'folder')
						? { onClick: onFolderWrapper, style: { cursor: 'pointer' } }
						: (utilsCheckFunc(onFile)
							? { onClick: onFileWrapper, style: { cursor: 'pointer' } }
							: {}) }
					isDeleted={isDeleted} 
					variant="h6">
					{(type === 'folder') ? <FolderIcon /> : <FilesPaperPreview value={ifImg} />} {name}
				</TypographyTable>
				<div />
				<TypographyTable 
					{ ...(type === 'folder')
						? { onClick: onFolderWrapper, style: { cursor: 'pointer' } }
						: (utilsCheckFunc(onFile)
							? { onClick: onFileWrapper, style: { cursor: 'pointer' } }
							: {}) }
					isDeleted={isDeleted} 
					variant="subtitle1">
					{description}
				</TypographyTable>
			</React.Fragment>, 
		}, { 
			children: <TypographyFetch 
				key={3} 
				apiUrl={ssoUserListApiUrl} 
				label="login">
				{userId}
			</TypographyFetch>, 
		}])}
	</StyledWrapper>;
};

Row = React.memo(Row);
Row.defaultProps = {
	onCheck: (() => {}),
	onFolder: (() => {}),
};
Row.propTypes = {
	onCheck: PropTypes.func,
	onFile: PropTypes.func,
	onFolder: PropTypes.func,
};

export default Row;
