import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContextProps } from '@nest-datum-ui/Context';
import { selectorMainExtract } from '@nest-datum-ui/Store';
import Table from 'components/Table';
import FilesDialogDisable from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Disable';
import FilesDialogDrop from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Drop';
import FilesFolder from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Folder';
import FilesFile from '@nest-datum-ui-admin-lib/files/src/components/Dialog/File';
import FilesDialogDisableMany from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Disable/Many';
import FilesDialogDropMany from '@nest-datum-ui-admin-lib/files/src/components/Dialog/Drop/Many';
import Row from './Row';

let Manager = ({ 
	onCheck, 
	onFile,
	onFolder,
	querySource, 
	withContextMenu, 
	bulkDeletion, 
	...props 
}) => {
	const { 
		files: { 
			filesManagerList: { 
				storeName, 
			}, 
		}, 
	} = React.useContext(ContextProps);
	const data = useSelector(selectorMainExtract([ 'api', 'list', storeName, 'data' ]));
	const onCheckWrapper = React.useCallback((item) => (e) => onCheck(e, item), [
		onCheck,
	]);

	return <Table 
		{ ...props }
		querySource={querySource}
		bulkDeletion={bulkDeletion}
		BottomComponent={<React.Fragment>
			<FilesDialogDisable />
			<FilesDialogDisableMany />
			<FilesDialogDrop />
			<FilesDialogDropMany />
			<FilesFolder />
			<FilesFile />
		</React.Fragment>}>
		{data
			&& data.map((item, index) => <Row
				key={item.id}
				querySource={querySource}
				withContextMenu={withContextMenu}
				bulkDeletion={bulkDeletion}
				id={item.id}
				parentId={item.parentId}
				path={item.path}
				name={item.name}
				description={item.description}
				type={item.type}
				size={item.size}
				userId={item.userId}
				isDeleted={item.isDeleted}
				isNotDelete={item.isNotDelete}
				createdAt={item.createdAt}
				updatedAt={item.updatedAt}
				onCheck={onCheckWrapper(item)}
				onFile={onFile}
				onFolder={onFolder}
				disableLink />)}
	</Table>;
};

Manager = React.memo(Manager);
Manager.defaultProps = {
	onCheck: (() => {}),
	onFile: (() => {}),
	onFolder: (() => {}),
};
Manager.propTypes = {
	onCheck: PropTypes.func,
	onFile: PropTypes.func,
	onFolder: PropTypes.func,
};

export default Manager;
